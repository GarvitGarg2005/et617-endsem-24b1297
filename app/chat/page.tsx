"use client";
// Chat Page — AI Conversational Practice with Hindi Mitra
// NLP Feature: Conversational practice for Hindi learning
// Distinguishes dialect variations from actual errors
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { logPageView, logEvent } from "@/lib/clickstream";
import { DIALECT_PATTERNS, ERROR_PATTERNS } from "@/lib/content";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  source?: "gemini" | "fallback";
  type?: "normal" | "dialect" | "error";
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "🙏 नमस्ते! मैं हिंदी मित्र हूँ। मैं तुम्हें श, स और ड़ सीखने में मदद करूँगा।\n\nबताओ, तुम्हारा नाम क्या है? 😊",
      source: "gemini",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "chat"
    );
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if user message contains dialect patterns or errors
  const checkForPatterns = (msg: string): { type: "dialect" | "error" | null; feedback: string | null } => {
    // Check dialect patterns first
    for (const pattern of DIALECT_PATTERNS) {
      if (msg.includes(pattern.bhojpuri)) {
        return { type: "dialect", feedback: pattern.context };
      }
    }
    // Check error patterns
    for (const pattern of ERROR_PATTERNS) {
      if (msg.includes(pattern.wrong)) {
        return { type: "error", feedback: pattern.feedback };
      }
    }
    return { type: null, feedback: null };
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "chat_message_sent",
      page: "chat",
      detail: userMessage,
    });

    // Check for dialect/error patterns locally
    const patternCheck = checkForPatterns(userMessage);
    if (patternCheck.type) {
      logEvent({
        userId: localStorage.getItem("userId") || "anonymous",
        sessionId: sessionStorage.getItem("sessionId") || "",
        eventType: patternCheck.type === "dialect" ? "dialect_acknowledged" : "misconception_detected",
        page: "chat",
        detail: `${patternCheck.type}: ${userMessage}`,
      });
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      let assistantContent = data.response;

      // If Gemini didn't catch a local pattern, append our feedback
      if (patternCheck.feedback && data.source !== "fallback") {
        // Let Gemini response stand, but add badge
      }

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: assistantContent,
          source: data.source,
          type: patternCheck.type || "normal",
        },
      ]);

      // If using fallback and there's a pattern match, add pattern feedback as separate message
      if (patternCheck.feedback && data.source === "fallback") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: patternCheck.feedback!,
              source: "fallback",
              type: patternCheck.type || "normal",
            },
          ]);
        }, 500);
      }

      logEvent({
        userId: localStorage.getItem("userId") || "anonymous",
        sessionId: sessionStorage.getItem("sessionId") || "",
        eventType: "chat_response_received",
        page: "chat",
        detail: `source: ${data.source}`,
        metadata: { patternType: patternCheck.type },
      });
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ कुछ गड़बड़ हो गई। फिर से कोशिश करो!",
          source: "fallback",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Suggestion chips for quick responses
  const suggestions = [
    "नमस्ते!",
    "शेर और सेर में क्या फ़र्क है?",
    "ड़ कब लगता है?",
    "मुझे एक सवाल पूछो",
    "मैं सादी जा रहा हूँ",
    "मेरे पड़ोसी अच्छे हैं",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4 shadow">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => router.push("/home")} className="hover:opacity-80">
            ←
          </button>
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h1 className="font-bold">हिंदी मित्र</h1>
            <p className="text-xs opacity-80">AI बातचीत अभ्यास | 🆔 24B1297</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-sm"
                    : "bg-white shadow rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
                {msg.role === "assistant" && msg.type === "dialect" && (
                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    🗣️ भोजपुरी बोली पहचानी गई
                  </span>
                )}
                {msg.role === "assistant" && msg.type === "error" && (
                  <span className="inline-block mt-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    ✏️ वर्तनी सुधार
                  </span>
                )}
                {msg.role === "assistant" && msg.source === "fallback" && (
                  <span className="inline-block mt-1 text-xs text-gray-400">📌 तैयार उत्तर</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow rounded-2xl rounded-bl-sm p-4">
                <p className="text-gray-400 animate-pulse">सोच रहा हूँ... 🤔</p>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 pb-2">
        <div className="max-w-lg mx-auto flex gap-2 overflow-x-auto pb-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(s);
              }}
              className="flex-shrink-0 bg-orange-100 text-orange-700 text-xs px-3 py-1.5 rounded-full hover:bg-orange-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="हिंदी में लिखो..."
            className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            भेजो
          </button>
        </div>
      </div>
    </div>
  );
}
