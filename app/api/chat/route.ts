// Gemini API route handler
// Proxies chat messages to Google Gemini API for conversational Hindi practice
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_SYSTEM_PROMPT, FALLBACK_CHAT_RESPONSES } from "@/lib/content";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback mode if no API key
      return NextResponse.json({
        response: getFallbackResponse(message),
        source: "fallback",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System instructions: " + GEMINI_SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "समझ गया! मैं हिंदी मित्र हूँ। मैं भोजपुरी-भाषी बच्चों को श/स और ड़ सिखाऊँगा। 😊" }] },
        ...(history || []).map((h: { role: string; content: string }) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response, source: "gemini" });
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback when API fails
    return NextResponse.json({
      response: getFallbackResponse(req.body ? "default" : "default"),
      source: "fallback",
      error: "AI सेवा अभी उपलब्ध नहीं है। पहले से तैयार उत्तर दिखाए जा रहे हैं।",
    });
  }
}

function getFallbackResponse(message: string): string {
  // Check for exact match first
  const lowerMsg = message.trim();
  if (FALLBACK_CHAT_RESPONSES[lowerMsg]) {
    return FALLBACK_CHAT_RESPONSES[lowerMsg];
  }

  // Check for keyword matches
  if (lowerMsg.includes("नमस्ते") || lowerMsg.includes("हेलो") || lowerMsg.includes("हाय")) {
    return FALLBACK_CHAT_RESPONSES["नमस्ते"];
  }
  if (lowerMsg.includes("हाँ") || lowerMsg.includes("हां") || lowerMsg.includes("जी")) {
    return FALLBACK_CHAT_RESPONSES["हाँ"];
  }
  if (lowerMsg.includes("नहीं") || lowerMsg.includes("ना")) {
    return FALLBACK_CHAT_RESPONSES["नहीं"];
  }

  // Check for श/स errors in user message
  if (lowerMsg.includes("सक्ति") || lowerMsg.includes("सेर") || lowerMsg.includes("विसाल")) {
    return "🔍 मैंने देखा कि तुमने 'स' लिखा जहाँ 'श' आना चाहिए था।\n\nयाद रखो:\n• श (sha) — शेर, शक्ति, शाम\n• स (sa) — सेब, समय, सड़क\n\nक्या तुम सही शब्द लिखकर दिखाओगे?";
  }

  // Check for Bhojpuri dialect patterns
  if (lowerMsg.includes("सादी") || lowerMsg.includes("सरम") || lowerMsg.includes("सहर") || lowerMsg.includes("साम")) {
    return "😊 मैं समझता हूँ! भोजपुरी में ऐसे बोलते हैं — यह गलत नहीं है, यह तुम्हारी बोली है!\n\nलेकिन हिंदी में लिखते समय:\n• सादी → शादी 💒\n• सरम → शरम\n• सहर → शहर 🏙️\n• साम → शाम 🌅\n\n'श' लगाना याद रखो! 📝";
  }

  return FALLBACK_CHAT_RESPONSES["default"];
}
