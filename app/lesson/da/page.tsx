"use client";
// Lesson: ड़ vs ड — Da with nukta
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LESSONS } from "@/lib/content";
import { logPageView, logEvent } from "@/lib/clickstream";
import AudioButton from "@/components/AudioButton";
import PhoneticsVisualizer from "@/components/PhoneticsVisualizer";
import { recordLessonCompletion } from "@/lib/userProgress";

export default function DaLesson() {
  const router = useRouter();
  const lesson = LESSONS.da;
  const [showExamples, setShowExamples] = useState(true);
  const [lang, setLang] = useState<"hi" | "en">("hi");

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "lesson_da"
    );
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "lesson_start",
      page: "lesson_da",
      detail: "ड़ vs ड lesson started",
    });
  }, []);

  const markComplete = () => {
    recordLessonCompletion("da");
    logEvent({
      userId: localStorage.getItem("current_userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: "lesson_complete",
      page: "lesson_da",
      detail: "ड़ vs ड lesson completed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/home")}
            className="text-green-600 flex items-center gap-1 hover:underline text-sm font-semibold"
          >
            ← {lang === "hi" ? "वापस जाओ" : "Back to Home"}
          </button>
          <button
            onClick={() => {
              const next = lang === "hi" ? "en" : "hi";
              setLang(next);
              logEvent({
                userId: localStorage.getItem("userId") || "anonymous",
                sessionId: sessionStorage.getItem("sessionId") || "",
                eventType: "language_toggle",
                page: "lesson_da",
                detail: `toggled_to_${next}`,
              });
            }}
            className="bg-green-100 border border-green-300 text-green-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm"
          >
            🌐 {lang === "hi" ? "English में देखें" : "हिंदी में देखें"}
          </button>
        </div>

        {/* Visual Phonetics Model & Lesson Audio Demonstrator */}
        <PhoneticsVisualizer
          topic="da"
          title={lang === "hi" ? "मुख आकृति एवं नुक्ता मॉडल (Phonetics Model)" : "Nukta Flap Articulation Model"}
        />

        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📖 {lang === "hi" ? "समझो:" : "Concept:"}</h2>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
            {(lang === "hi" ? lesson.explanation : lesson.explanationEn).split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-bold text-green-800 mt-3">
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

        {/* Visual comparison */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">👀 देखो — ड vs ड़:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
              <p className="text-5xl font-bold text-red-700">ड</p>
              <p className="text-sm text-red-600 mt-2">बिना नुक्ता</p>
              <p className="text-xs text-gray-500">डमरू, डर</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <p className="text-5xl font-bold text-green-700">ड़</p>
              <p className="text-sm text-green-600 mt-2">नुक्ते वाला ✓</p>
              <p className="text-xs text-gray-500">लड़का, सड़क</p>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <button
            onClick={() => {
              setShowExamples(!showExamples);
              logEvent({
                userId: localStorage.getItem("userId") || "anonymous",
                sessionId: sessionStorage.getItem("sessionId") || "",
                eventType: "click",
                page: "lesson_da",
                detail: showExamples ? "hide_examples" : "show_examples",
              });
            }}
            className="w-full text-left font-bold text-lg text-gray-800 flex items-center justify-between"
          >
            <span>📋 उदाहरण देखो</span>
            <span className="text-green-500">{showExamples ? "▲ छुपाओ" : "▼ दिखाओ"}</span>
          </button>
          {showExamples && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {lesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-center ${
                    ex.letter === "ड़"
                      ? "bg-green-100 border border-green-300"
                      : "bg-red-100 border border-red-300"
                  }`}
                >
                  <p className="text-xl font-bold">{ex.word}</p>
                  <p className="text-xs text-gray-600">{ex.meaning}</p>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <span className="text-xs font-bold bg-white rounded px-2 py-0.5">
                      {ex.letter}
                    </span>
                    <AudioButton text={ex.word} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Quiz */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">🧠 जल्दी जाँचो:</h2>
          <p className="text-gray-700 mb-3">"ल___का" — सही विकल्प चुनो:</p>
          <QuickQuiz />
        </div>

        <button
          onClick={() => {
            markComplete();
            router.push("/practice");
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition-colors"
        >
          अभ्यास शुरू करो →
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">🆔 24B1297</p>
      </div>
    </div>
  );
}

function QuickQuiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const options = ["लड़का (ड़ — नुक्ते वाला)", "लडका (ड — बिना नुक्ता)"];
  const correct = 0;

  const handleSelect = (idx: number) => {
    setSelected(idx);
    logEvent({
      userId: localStorage.getItem("userId") || "anonymous",
      sessionId: sessionStorage.getItem("sessionId") || "",
      eventType: idx === correct ? "answer_correct" : "answer_incorrect",
      page: "lesson_da",
      detail: `quick_quiz: selected ${options[idx]}`,
    });
  };

  return (
    <div>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
              selected === null
                ? "bg-gray-100 hover:bg-green-100 border border-gray-200"
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
          {selected === correct
            ? "✅ सही! लड़का में 'ड़' (नुक्ते वाला) आता है।"
            : "❌ ध्यान दो! लड़का में 'ड़' लगता है — नीचे बिंदी होती है। भोजपुरी में 'ड' बोलते हैं, लेकिन लिखने में नुक्ता ज़रूरी है।"}
        </div>
      )}
    </div>
  );
}
