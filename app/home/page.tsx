"use client";
// Home Dashboard with user-specific progress and Logout capability
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logPageView, logEvent } from "@/lib/clickstream";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const activeUser = localStorage.getItem("current_userName");
    const activeId = localStorage.getItem("current_userId");

    if (!activeUser || !activeId) {
      router.push("/");
      return;
    }

    setUserName(activeUser);
    setUserId(activeId);

    // Load user-specific progress
    try {
      const stored = localStorage.getItem(`progress_${activeId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCompletedLessons(parsed.completedLessons || []);
      } else {
        setCompletedLessons([]);
      }
    } catch {
      setCompletedLessons([]);
    }

    logPageView(activeId, sessionStorage.getItem("sessionId") || "", "home");
  }, [router]);

  const handleLogout = () => {
    logEvent({
      userId: userId || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "click",
      page: "home",
      detail: "user_logout",
    });
    localStorage.removeItem("current_userId");
    localStorage.removeItem("current_userName");
    router.push("/");
  };

  const handleNavigate = (path: string, label: string) => {
    logEvent({
      userId: userId || "anonymous",
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
      title: "पाठ १: श और स का अंतर",
      desc: "तालव्य और दन्त्य उच्चारण सीखो",
      emoji: "🔤",
      path: "/lesson/sha-sa",
      color: "bg-blue-500",
    },
    {
      id: "da",
      title: "पाठ २: ड़ को पहचानो",
      desc: "ड और ड़ (नुक्ता) में फ़र्क सीखो",
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
      title: "अभ्यास करो (८ प्रश्न)",
      desc: "MCQ, खाली जगह भरो, सही/गलत, जोड़ी",
      emoji: "📝",
      path: "/practice",
      color: "bg-purple-500",
    },
    {
      id: "chat",
      title: "AI बातचीत अभ्यास",
      desc: "हिंदी मित्र से बात करो (कीबोर्ड सहित)",
      emoji: "💬",
      path: "/chat",
      color: "bg-orange-500",
    },
    {
      id: "results",
      title: "मेरी प्रगति रिपोर्ट",
      desc: "अपने व्यक्तिगत अंक और प्रगति देखो",
      emoji: "📊",
      path: "/results",
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header with Logout Button */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-orange-700">
              🙏 नमस्ते, {userName}!
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">आईडी: {userId.substring(0, 18)}...</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
            title="विद्यार्थी बदलें / लॉगआउट"
          >
            लॉगआउट 🚪
          </button>
        </div>

        {/* Lesson Cards */}
        <div className="space-y-3">
          {lessons.map((lesson) => {
            const isDone = completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => handleNavigate(lesson.path, lesson.id)}
                className="w-full bg-white rounded-xl shadow hover:shadow-md transition-all p-3.5 flex items-center gap-3.5 text-left border border-orange-100 cursor-pointer"
              >
                <div
                  className={`${lesson.color} text-white text-xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {lesson.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-800 text-sm truncate">{lesson.title}</h2>
                  <p className="text-xs text-gray-500 truncate">{lesson.desc}</p>
                </div>
                {isDone ? (
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md border border-green-200">
                    ✅ पूरा
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                    बाकी
                  </span>
                )}
                <span className="text-gray-400 text-sm">→</span>
              </button>
            );
          })}
        </div>

        {/* Footer Link */}
        <button
          onClick={() => handleNavigate("/about", "about")}
          className="w-full mt-6 text-center text-xs text-gray-500 hover:text-orange-600 cursor-pointer"
        >
          ℹ️ इस ऐप के बारे में | 🆔 24B1297
        </button>
      </div>
    </div>
  );
}
