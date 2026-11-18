"use client";
// Lesson: श vs स — Sha vs Sa
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LESSONS } from "@/lib/content";
import { logPageView, logEvent } from "@/lib/clickstream";

export default function ShaSaLesson() {
  const router = useRouter();
  const lesson = LESSONS.shaSa;
  const [currentStep, setCurrentStep] = useState(0);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "lesson_sha_sa"
    );
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "lesson_start",
      page: "lesson_sha_sa",
      detail: "श vs स lesson started",
    });
  }, []);

  const markComplete = () => {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    if (!completed.includes("sha-sa")) {
      completed.push("sha-sa");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "lesson_complete",
      page: "lesson_sha_sa",
      detail: "श vs स lesson completed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push("/home")}
          className="text-blue-600 mb-4 flex items-center gap-1 hover:underline"
        >
          ← वापस जाओ
        </button>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h1 className="text-2xl font-bold text-blue-700 mb-1">
            🔤 {lesson.title}
          </h1>
          <p className="text-blue-500">{lesson.subtitle}</p>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📖 समझो:</h2>
          <div className="prose prose-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {lesson.explanation.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-bold text-blue-800 mt-3">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.startsWith("💡")) {
                return (
                  <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                    <p className="text-yellow-800">{line}</p>
                  </div>
                );
              }
              return <p key={i} className="my-1">{line}</p>;
            })}
          </div>
        </div>

        {/* Examples Toggle */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <button
            onClick={() => {
              setShowExamples(!showExamples);
              logEvent({
                userId: localStorage.getItem("userId") || "anonymous",
                sessionId: sessionStorage.getItem("sessionId") || "",
                eventType: "click",
                page: "lesson_sha_sa",
                detail: showExamples ? "hide_examples" : "show_examples",
              });
            }}
            className="w-full text-left font-bold text-lg text-gray-800 flex items-center justify-between"
          >
            <span>📋 उदाहरण देखो</span>
            <span className="text-blue-500">{showExamples ? "▲ छुपाओ" : "▼ दिखाओ"}</span>
          </button>

          {showExamples && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {lesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-center ${
                    ex.letter === "श"
                      ? "bg-blue-100 border border-blue-300"
                      : ex.letter === "स"
                      ? "bg-green-100 border border-green-300"
                      : "bg-orange-100 border border-orange-300"
                  }`}
                >
                  <p className="text-xl font-bold">{ex.word}</p>
                  <p className="text-xs text-gray-600">{ex.meaning}</p>
                  <span className="inline-block mt-1 text-xs font-bold bg-white rounded px-2 py-0.5">
                    {ex.letter}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Quiz */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">🧠 जल्दी जाँचो:</h2>
          <QuickQuiz
            question="'शेर' में कौन सा अक्षर है?"
            options={["श (sha)", "स (sa)"]}
            correct={0}
            successMsg="✅ बिल्कुल सही! शेर 🦁 में 'श' आता है।"
            failMsg="❌ ध्यान दो! शेर में 'श' आता है, 'स' नहीं।"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            markComplete();
            router.push("/lesson/da");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors"
        >
          अगला पाठ: ड़ को पहचानो →
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">🆔 24B1297</p>
      </div>
    </div>
  );
}

// Quick Quiz Component
function QuickQuiz({
  question,
  options,
  correct,
  successMsg,
  failMsg,
}: {
  question: string;
  options: string[];
  correct: number;
  successMsg: string;
  failMsg: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: idx === correct ? "answer_correct" : "answer_incorrect",
      page: "lesson_sha_sa",
      detail: `quick_quiz: selected ${options[idx]}, correct: ${options[correct]}`,
    });
  };

  return (
    <div>
      <p className="text-gray-700 mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
              selected === null
                ? "bg-gray-100 hover:bg-blue-100 border border-gray-200"
                : i === correct
                ? "bg-green-100 border border-green-400 text-green-800"
                : i === selected
                ? "bg-red-100 border border-red-400 text-red-800"
                : "bg-gray-100 border border-gray-200 opacity-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            selected === correct
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {selected === correct ? successMsg : failMsg}
        </div>
      )}
    </div>
  );
}
