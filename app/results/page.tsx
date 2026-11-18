"use client";
// Results Page — Progress tracking and score display
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logPageView } from "@/lib/clickstream";

export default function ResultsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [practiceScore, setPracticeScore] = useState<{ score: number; total: number } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "विद्यार्थी");
    const score = localStorage.getItem("practiceScore");
    if (score) setPracticeScore(JSON.parse(score));
    setCompletedLessons(JSON.parse(localStorage.getItem("completedLessons") || "[]"));
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "results"
    );
  }, []);

  const totalActivities = 4; // sha-sa, da, practice, chat
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalActivities) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => router.push("/home")}
          className="text-teal-600 mb-4 flex items-center gap-1 hover:underline"
        >
          ← वापस जाओ
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4 text-center">
          <div className="text-5xl mb-3">📊</div>
          <h1 className="text-2xl font-bold text-teal-700">{userName} की प्रगति</h1>
          <p className="text-gray-500 mt-1">तुम कितना सीख चुके हो, यहाँ देखो</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📈 कुल प्रगति</h2>
          <div className="bg-gray-200 rounded-full h-6 overflow-hidden mb-2">
            <div
              className="bg-teal-500 h-full rounded-full transition-all flex items-center justify-end pr-2"
              style={{ width: `${Math.max(progressPercent, 10)}%` }}
            >
              <span className="text-xs text-white font-bold">{progressPercent}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {completedCount} / {totalActivities} गतिविधियाँ पूरी
          </p>
        </div>

        {/* Activity Status */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📋 गतिविधियाँ</h2>
          <div className="space-y-3">
            {[
              { id: "sha-sa", name: "श और स का अंतर", emoji: "🔤" },
              { id: "da", name: "ड़ को पहचानो", emoji: "✏️" },
              { id: "practice", name: "अभ्यास (MCQ, भरो, सही/गलत)", emoji: "📝" },
              { id: "chat", name: "बातचीत अभ्यास", emoji: "💬" },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <span className="text-xl">{activity.emoji}</span>
                <span className="flex-1 text-gray-700">{activity.name}</span>
                <span className={completedLessons.includes(activity.id) ? "text-green-500" : "text-gray-300"}>
                  {completedLessons.includes(activity.id) ? "✅ पूरा" : "⬜ बाकी"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Score */}
        {practiceScore && (
          <div className="bg-white rounded-2xl shadow p-6 mb-4">
            <h2 className="font-bold text-lg text-gray-800 mb-3">📝 अभ्यास के अंक</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-600">
                {practiceScore.score} / {practiceScore.total}
              </p>
              <p className="text-gray-500 mt-1">
                {practiceScore.score >= practiceScore.total * 0.7
                  ? "🌟 बहुत बढ़िया! तुम अच्छा कर रहे हो!"
                  : practiceScore.score >= practiceScore.total * 0.4
                  ? "💪 अच्छा प्रयास! और अभ्यास करो।"
                  : "😊 कोई बात नहीं! पहले पाठ दोबारा पढ़ो, फिर अभ्यास करो।"}
              </p>
            </div>
          </div>
        )}

        {/* Learning Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-lg text-yellow-800 mb-2">💡 सीखने के सुझाव</h2>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• रोज़ 10 मिनट अभ्यास करो — छोटे-छोटे कदम बड़ी सफलता लाते हैं</li>
            <li>• गलती होने पर निराश मत होओ — भोजपुरी और हिंदी दोनों तुम्हारी भाषाएँ हैं</li>
            <li>• AI मित्र से बातचीत करो — बोलकर सीखना आसान है</li>
            <li>• "शेर शक्तिशाली है" — इस वाक्य से श याद करो!</li>
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">🆔 24B1297</p>
      </div>
    </div>
  );
}
