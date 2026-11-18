"use client";
// Lesson 3: Sentence Usage and Contextual Spelling
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LESSONS } from "@/lib/content";
import { logPageView, logEvent } from "@/lib/clickstream";
import { speakHindi } from "@/lib/speech";

export default function SentenceLesson() {
  const router = useRouter();
  const lesson = LESSONS.advancedSentences;
  const [lang, setLang] = useState<"hi" | "en">("hi");

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "lesson_sentences"
    );
  }, []);

  const markComplete = () => {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    if (!completed.includes("sentences")) {
      completed.push("sentences");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }
    router.push("/practice");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/home")}
            className="text-orange-600 flex items-center gap-1 hover:underline text-sm font-semibold"
          >
            ← {lang === "hi" ? "वापस जाओ" : "Back to Dashboard"}
          </button>
          <button
            onClick={() => {
              const next = lang === "hi" ? "en" : "hi";
              setLang(next);
              logEvent({
                userId: localStorage.getItem("userId") || "anonymous",
                sessionId: sessionStorage.getItem("sessionId") || "",
                eventType: "language_toggle",
                page: "lesson_sentences",
                detail: `toggled_to_${next}`,
              });
            }}
            className="bg-orange-100 border border-orange-300 text-orange-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm"
          >
            🌐 {lang === "hi" ? "English में देखें" : "हिंदी में देखें"}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h1 className="text-2xl font-bold text-orange-800 mb-1">
            📜 {lang === "hi" ? lesson.title : lesson.titleEn}
          </h1>
          <p className="text-orange-600 text-sm">{lang === "hi" ? lesson.subtitle : lesson.subtitleEn}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">
            📖 {lang === "hi" ? "विस्तृत व्याख्या" : "Detailed Explanation"}
          </h2>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
            {(lang === "hi" ? lesson.explanation : lesson.explanationEn).split("\n").map((line, i) => (
              <p key={i} className="my-1.5">{line}</p>
            ))}
          </div>
        </div>

        {/* Pronunciation & Auditory Training */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-2">
            🔊 {lang === "hi" ? "बोलकर सुनो और अभ्यास करो" : "Listen & Pronounce"}
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            {lang === "hi" 
              ? "ध्वनि का अंतर समझने के लिए स्पीकर बटन दबाएँ:" 
              : "Tap speaker icon to hear authentic pronunciation articulation:"}
          </p>

          <div className="space-y-3">
            {lesson.examples.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200">
                <div>
                  <p className="font-bold text-gray-900 text-base">{item.word}</p>
                  <p className="text-xs text-gray-500">{item.meaning} ({item.phonetic})</p>
                </div>
                <button
                  onClick={() => speakHindi(item.word)}
                  className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white p-2.5 rounded-full shadow transition-transform"
                  title="उच्चारण सुनो"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={markComplete}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-lg shadow-md transition-colors"
        >
          {lang === "hi" ? "अभ्यास की ओर बढ़ें →" : "Proceed to Exercises →"}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">🆔 24B1297</p>
      </div>
    </div>
  );
}
