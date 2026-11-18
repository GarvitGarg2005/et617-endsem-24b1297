"use client";
// About Page — App info, identity token, tech details
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logPageView } from "@/lib/clickstream";

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "about"
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => router.push("/home")}
          className="text-gray-600 mb-4 flex items-center gap-1 hover:underline"
        >
          ← वापस जाओ
        </button>

        <div className="bg-white rounded-2xl shadow p-6 mb-4 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-orange-700">हिंदी मित्र</h1>
          <p className="text-orange-500 mt-1">श, स और ड़ सीखो!</p>
          <div className="mt-4 inline-block bg-orange-100 text-orange-800 font-bold px-4 py-2 rounded-lg text-lg">
            🆔 24B1297
          </div>
        </div>

        {/* About the app */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📖 इस ऐप के बारे में</h2>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong>हिंदी मित्र</strong> भोजपुरी-भाषी विद्यार्थियों (कक्षा 6-8) के लिए बनाया गया है।
              यह ऐप हिंदी वर्तनी सिखाता है, खासकर:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>श और स में अंतर पहचानना</li>
              <li>ड़ (नुक्ते वाला ड) का सही उपयोग</li>
              <li>भोजपुरी बोली और मानक हिंदी के अंतर को समझना</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 font-medium">🗣️ बोली vs वर्तनी त्रुटि</p>
              <p className="text-blue-700 text-xs mt-1">
                यह ऐप भोजपुरी बोली की विशेषताओं (जैसे "सादी" = शादी) को पहचानता है
                और उन्हें <strong>गलती नहीं, बोली का अंतर</strong> बताता है। वास्तविक
                वर्तनी त्रुटियों (जैसे "सक्ति" = शक्ति) को अलग से सुधारता है।
              </p>
            </div>
          </div>
        </div>

        {/* Educational design */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">🎓 शैक्षिक डिज़ाइन</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>विषय:</strong> T10 — Hindi for Bhojpuri-speaking learners: श/स and ड़</p>
            <p><strong>विद्यार्थी:</strong> L1 — ग्रामीण सरकारी विद्यालय, कक्षा 6-8, अभिभावक का Android फोन</p>
            <p><strong>बाधा:</strong> C2 — सभी टेक्स्ट हिंदी में (अंग्रेज़ी वैकल्पिक)</p>
            <p><strong>NLP सुविधा:</strong> AI बातचीत अभ्यास (Gemini API + Hardcoded Fallback)</p>
          </div>
        </div>

        {/* Learning theories */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">📐 सिद्धांत आधार</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• <strong>Bloom's Taxonomy:</strong> पहचानो → प्रयोग करो → अंतर करो (Remember → Apply → Analyze)</p>
            <p>• <strong>Cognitive Load Theory:</strong> छोटे-छोटे भाग में सीखना, एक बार में ज़्यादा नहीं</p>
            <p>• <strong>Situated Learning:</strong> भोजपुरी संदर्भ में हिंदी सीखना</p>
            <p>• <strong>Constructivism:</strong> बातचीत और अभ्यास से खुद ज्ञान बनाना</p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg text-gray-800 mb-3">🛠️ तकनीकी जानकारी</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• <strong>Framework:</strong> Next.js 14 + TypeScript + Tailwind CSS</p>
            <p>• <strong>AI:</strong> Google Gemini 2.0 Flash API + Hardcoded Fallback</p>
            <p>• <strong>Database:</strong> Firebase Firestore (clickstream data)</p>
            <p>• <strong>Auth:</strong> Firebase Authentication</p>
            <p>• <strong>Hosting:</strong> Vercel</p>
          </div>
        </div>

        {/* Identity */}
        <div className="bg-orange-100 rounded-2xl p-6 text-center">
          <p className="text-orange-800 font-bold text-lg">ET 617 End-Semester Examination</p>
          <p className="text-orange-600 mt-1">Roll Number: 24B1297</p>
          <p className="text-orange-500 text-sm mt-1">November 18, 2026</p>
        </div>
      </div>
    </div>
  );
}
