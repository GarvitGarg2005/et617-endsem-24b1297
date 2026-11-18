"use client";
// Practice Page — Interactive exercises (MCQ, Fill-blank, True/False, Matching)
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PRACTICE_QUESTIONS } from "@/lib/content";
import { logPageView, logEvent } from "@/lib/clickstream";

export default function PracticePage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [showMisconception, setShowMisconception] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = PRACTICE_QUESTIONS;
  const q = questions[currentQ];

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "practice"
    );
  }, []);

  const handleAnswer = (correct: boolean, detail: string) => {
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: correct ? "answer_correct" : "answer_incorrect",
      page: "practice",
      detail: `q${q.id}: ${detail}`,
      metadata: { questionId: q.id, questionType: q.type },
    });

    // Log misconception if detected
    if (!correct && q.misconception) {
      setShowMisconception(true);
      logEvent({
        userId: localStorage.getItem("userId") || "anonymous",
        sessionId: sessionStorage.getItem("sessionId") || "",
        eventType: "misconception_detected",
        page: "practice",
        detail: `misconception at q${q.id}: ${q.misconception}`,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      // Save score
      localStorage.setItem("practiceScore", JSON.stringify({ score: score, total: questions.length }));
      const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (!completed.includes("practice")) {
        completed.push("practice");
        localStorage.setItem("completedLessons", JSON.stringify(completed));
      }
      return;
    }
    setCurrentQ(currentQ + 1);
    setAnswered(false);
    setIsCorrect(false);
    setUserAnswer("");
    setMatchedPairs({});
    setSelectedLeft(null);
    setShowMisconception(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">{score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
          <h1 className="text-2xl font-bold text-purple-700 mb-2">अभ्यास पूरा हुआ!</h1>
          <p className="text-lg text-gray-700 mb-4">
            तुम्हारे अंक: <span className="font-bold text-purple-600">{score}/{questions.length}</span>
          </p>
          {score >= questions.length * 0.7 ? (
            <p className="text-green-600 mb-6">बहुत बढ़िया! 🌟 तुम अच्छा सीख रहे हो!</p>
          ) : (
            <p className="text-orange-600 mb-6">कोई बात नहीं! अभ्यास से सब सीखोगे। फिर से कोशिश करो! 😊</p>
          )}
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setFinished(false);
                setAnswered(false);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
            >
              🔄 फिर से अभ्यास करो
            </button>
            <button
              onClick={() => router.push("/chat")}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl"
            >
              💬 बातचीत अभ्यास करो
            </button>
            <button
              onClick={() => router.push("/results")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl"
            >
              📊 प्रगति देखो
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">🆔 24B1297</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => router.push("/home")}
          className="text-purple-600 mb-4 flex items-center gap-1 hover:underline"
        >
          ← वापस जाओ
        </button>

        {/* Progress bar */}
        <div className="bg-white rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">
          प्रश्न {currentQ + 1} / {questions.length} | अंक: {score}
        </p>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">
              {q.type === "mcq" ? "MCQ" : q.type === "fill" ? "खाली जगह" : q.type === "truefalse" ? "सही/गलत" : "जोड़ी मिलाओ"}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">{q.question}</h2>

          {/* MCQ */}
          {q.type === "mcq" && (
            <div className="space-y-2">
              {q.options!.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i === q.correct, `selected: ${opt}`)}
                  disabled={answered}
                  className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
                    !answered
                      ? "bg-gray-100 hover:bg-purple-100 border border-gray-200"
                      : i === q.correct
                      ? "bg-green-100 border border-green-400"
                      : "bg-red-100 border border-red-300 opacity-60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Fill in the blank */}
          {q.type === "fill" && (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={answered}
                placeholder="यहाँ लिखो..."
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              />
              {!answered && (
                <button
                  onClick={() => {
                    const correct = userAnswer.trim() === q.correct;
                    handleAnswer(correct, `typed: ${userAnswer.trim()}`);
                  }}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl"
                >
                  जाँचो ✓
                </button>
              )}
            </div>
          )}

          {/* True/False */}
          {q.type === "truefalse" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(q.correct === true, "selected: सही")}
                disabled={answered}
                className={`p-4 rounded-xl font-bold text-lg transition-colors ${
                  !answered
                    ? "bg-green-100 hover:bg-green-200 border border-green-300"
                    : q.correct === true
                    ? "bg-green-200 border-2 border-green-500"
                    : "bg-green-50 opacity-50"
                }`}
              >
                ✅ सही
              </button>
              <button
                onClick={() => handleAnswer(q.correct === false, "selected: गलत")}
                disabled={answered}
                className={`p-4 rounded-xl font-bold text-lg transition-colors ${
                  !answered
                    ? "bg-red-100 hover:bg-red-200 border border-red-300"
                    : q.correct === false
                    ? "bg-green-200 border-2 border-green-500"
                    : "bg-red-50 opacity-50"
                }`}
              >
                ❌ गलत
              </button>
            </div>
          )}

          {/* Matching */}
          {q.type === "matching" && q.pairs && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {q.pairs.map((pair: { left: string; right: string }, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedLeft(pair.left)}
                      disabled={answered || !!matchedPairs[pair.left]}
                      className={`w-full p-3 rounded-lg text-center font-medium transition-colors ${
                        matchedPairs[pair.left]
                          ? "bg-green-100 border border-green-400"
                          : selectedLeft === pair.left
                          ? "bg-purple-200 border-2 border-purple-500"
                          : "bg-gray-100 hover:bg-purple-100 border border-gray-200"
                      }`}
                    >
                      {pair.left}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {[...q.pairs].sort(() => Math.random() - 0.5).map((pair: { left: string; right: string }, i: number) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (selectedLeft) {
                          const correctPair = q.pairs!.find((p: { left: string; right: string }) => p.left === selectedLeft);
                          if (correctPair && correctPair.right === pair.right) {
                            setMatchedPairs({ ...matchedPairs, [selectedLeft]: pair.right });
                            if (Object.keys(matchedPairs).length + 1 === q.pairs!.length) {
                              handleAnswer(true, "all pairs matched correctly");
                            }
                          }
                          setSelectedLeft(null);
                        }
                      }}
                      disabled={answered || Object.values(matchedPairs).includes(pair.right)}
                      className={`w-full p-3 rounded-lg text-center font-medium transition-colors ${
                        Object.values(matchedPairs).includes(pair.right)
                          ? "bg-green-100 border border-green-400"
                          : "bg-gray-100 hover:bg-purple-100 border border-gray-200"
                      }`}
                    >
                      {pair.right}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {answered && (
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
              <p className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                {q.explanation}
              </p>
              {showMisconception && q.misconception && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>भोजपुरी संदर्भ:</strong> {q.misconception}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next button */}
        {answered && (
          <button
            onClick={nextQuestion}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl text-lg"
          >
            {currentQ + 1 >= questions.length ? "📊 नतीजे देखो" : "अगला प्रश्न →"}
          </button>
        )}
        <p className="text-center text-xs text-gray-400 mt-2">🆔 24B1297</p>
      </div>
    </div>
  );
}
