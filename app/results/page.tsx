"use client";
// Results Page — Isolated Per-User Analytics
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logPageView } from "@/lib/clickstream";
import { getUserProgress } from "@/lib/userProgress";

export default function ResultsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [practiceScore, setPracticeScore] = useState<{ score: number; total: number } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const activeName = localStorage.getItem("current_userName") || "विद्यार्थी";
    const activeId = localStorage.getItem("current_userId");

    if (!activeId) {
      router.push("/");
      return;
    }

    setUserName(activeName);
    const progress = getUserProgress();
    setPracticeScore(progress.practiceScore);
    setCompletedLessons(progress.completedLessons);

    logPageView(
      activeId,
      sessionStorage.getItem("sessionId") || "",
      "results"
    );
  }, [router]);

  const totalActivities = 4; // sha-sa, da, sentences, practice
  const completedCount = completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalActivities) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/home")}
            className="text-teal-600 flex items-center gap-1 hover:underline text-sm font-semibold cursor-pointer"
          >
            ← वापस जाओ
          </button>
          <span className="text-xs text-gray-500 font-medium">विद्यार्थी: {userName}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4 text-center">
          <div className="text-5xl mb-3">📊</div>
          <h1 className="text-2xl font-bold text-teal-700">{userName} की व्यक्तिगत रिपोर्ट</h1>
          <p className="text-gray-500 text-xs mt-1">आपकी सीखने की प्रगति केवल आपके खाते में सुरक्षित है</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-base text-gray-800 mb-2">📈 कुल प्रगति</h2>
          <div className="bg-gray-200 rounded-full h-6 overflow-hidden mb-2">
            <div
              className="bg-teal-500 h-full rounded-full transition-all flex items-center justify-end pr-2"
              style={{ width: `${Math.max(progressPercent, 8)}%` }}
            >
              <span className="text-xs text-white font-bold">{progressPercent}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            {completedCount} / {totalActivities} मुख्य गतिविधियाँ पूरी
          </p>
        </div>

        {/* Activity Status */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-base text-gray-800 mb-3">📋 पाठों की स्थिति</h2>
          <div className="space-y-2.5">
            {[
              { id: "sha-sa", name: "पाठ १: श और स का अंतर", emoji: "🔤" },
              { id: "da", name: "पाठ २: ड़ को पहचानो", emoji: "✏️" },
              { id: "sentences", name: "पाठ ३: वाक्य में प्रयोग", emoji: "📜" },
              { id: "practice", name: "अभ्यास मॉड्यूल (८ प्रश्न)", emoji: "📝" },
            ].map((activity) => {
              const isDone = completedLessons.includes(activity.id);
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <span className="text-xl">{activity.emoji}</span>
                  <span className="flex-1 text-sm font-medium text-gray-700">{activity.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isDone ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {isDone ? "✅ पूरा" : "बाकी"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Score */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-base text-gray-800 mb-2">📝 अभ्यास के अंक</h2>
          {practiceScore ? (
            <div className="text-center py-2">
              <p className="text-4xl font-extrabold text-teal-600">
                {practiceScore.score} / {practiceScore.total}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {practiceScore.score >= practiceScore.total * 0.75
                  ? "🌟 उत्कृष्ट प्रदर्शन! आप मानक हिंदी वर्तनी में निपुण हो रहे हैं।"
                  : practiceScore.score >= practiceScore.total * 0.5
                  ? "💪 अच्छा प्रयास! पाठ दोबारा पढ़कर फिर से अभ्यास करें।"
                  : "💡 कोई बात नहीं! ऑडियो गाइड दोबारा सुनें और फिर कोशिश करें।"}
              </p>
            </div>
          ) : (
            <div className="text-center py-3 text-xs text-gray-400">
              अभी तक अभ्यास पूरा नहीं किया गया है। अभ्यास शुरू करने के लिए 'अभ्यास करो' पर जाएँ।
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">🆔 24B1297</p>
      </div>
    </div>
  );
}
