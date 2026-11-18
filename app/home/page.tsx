"use client";
// Home Page — Dashboard for lesson selection
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logPageView, logEvent } from "@/lib/clickstream";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      router.push("/");
      return;
    }
    setUserName(name);
    try {
      const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      setCompletedLessons(completed);
    } catch {
      setCompletedLessons([]);
    }
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "home"
    );
  }, [router]);

  const handleNavigate = (path: string, label: string) => {
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "click",
      page: "home",
      detail: `navigate_to_${label}`,
    });
    router.push(path);
  };



  const lessons = [
    {
      id: "sha-sa",
      title: "श और स का अंतर",
      desc: "दोनों अक्षरों को पहचानना सीखो",
      emoji: "🔤",
      path: "/lesson/sha-sa",
      color: "bg-blue-500",
    },
    {
      id: "da",
      title: "ड़ को पहचानो",
      desc: "ड और ड़ में फ़र्क सीखो",
      emoji: "✏️",
      path: "/lesson/da",
      color: "bg-green-500",
    },
    {
      id: "sentences",
      title: "पाठ ३: वाक्य में प्रयोग",
      desc: "दैनिक जीवन के वाक्यों में श/स/ड़",
      emoji: "📜",
      path: "/lesson/sentences",
      color: "bg-amber-500",
    },
    {
      id: "practice",
      title: "अभ्यास करो",
      desc: "MCQ, खाली जगह भरो, सही/गलत",
      emoji: "📝",
      path: "/practice",
      color: "bg-purple-500",
    },
    {
      id: "chat",
      title: "बातचीत अभ्यास",
      desc: "AI हिंदी मित्र से बात करो",
      emoji: "💬",
      path: "/chat",
      color: "bg-orange-500",
    },
    {
      id: "results",
      title: "मेरी प्रगति",
      desc: "अपने अंक और प्रगति देखो",
      emoji: "📊",
      path: "/results",
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-orange-700">
            🙏 नमस्ते, {userName}!
          </h1>
          <p className="text-gray-600 mt-1">आज क्या सीखना है? नीचे से चुनो:</p>
        </div>

        {/* Lesson Cards */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleNavigate(lesson.path, lesson.id)}
              className="w-full bg-white rounded-xl shadow hover:shadow-md transition-shadow p-4 flex items-center gap-4 text-left"
            >
              <div
                className={`${lesson.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                {lesson.emoji}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{lesson.title}</h2>
                <p className="text-sm text-gray-500">{lesson.desc}</p>
              </div>
              {completedLessons.includes(lesson.id) && (
                <span className="text-green-500 text-xl">✅</span>
              )}
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>

        {/* About Link */}
        <button
          onClick={() => handleNavigate("/about", "about")}
          className="w-full mt-6 text-center text-sm text-gray-500 hover:text-orange-600"
        >
          ℹ️ इस ऐप के बारे में | 🆔 24B1297
        </button>
      </div>
    </div>
  );
}
