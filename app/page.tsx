"use client";
// Welcome Page — हिंदी मित्र
// Landing page with app introduction in Hindi and login/start option
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logPageView, generateSessionId } from "@/lib/clickstream";

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Generate session ID on first visit
    if (!sessionStorage.getItem("sessionId")) {
      sessionStorage.setItem("sessionId", generateSessionId());
    }
    logPageView(
      localStorage.getItem("userId") || "anonymous",
      sessionStorage.getItem("sessionId") || "",
      "welcome"
    );
  }, []);

  const handleStart = () => {
    if (!name.trim()) return;
    setIsLoading(true);
    const userId = `user_${Date.now()}`;
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", name.trim());
    
    // Log the start event
    logPageView(userId, sessionStorage.getItem("sessionId") || "", "login");
    
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* App Logo / Title */}
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-3xl font-bold text-orange-700 mb-2">हिंदी मित्र</h1>
        <p className="text-lg text-orange-600 mb-1">श, स और ड़ सीखो!</p>
        <p className="text-sm text-gray-500 mb-6">
          भोजपुरी बोलने वालों के लिए हिंदी वर्तनी ऐप
        </p>

        {/* Features */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold text-orange-800 mb-2">इस ऐप में सीखोगे:</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>✅ श और स में फ़र्क पहचानना</li>
            <li>✅ ड़ (नुक्ते वाला) कब लगता है</li>
            <li>✅ भोजपुरी और हिंदी के अंतर समझना</li>
            <li>✅ बातचीत से अभ्यास करना (AI मित्र)</li>
          </ul>
        </div>

        {/* Name Input */}
        <div className="space-y-3">
          <label className="block text-left text-sm font-medium text-gray-700">
            अपना नाम लिखो:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="जैसे: रामू"
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg"
          />
          <button
            onClick={handleStart}
            disabled={!name.trim() || isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-lg transition-colors"
          >
            {isLoading ? "शुरू हो रहा है..." : "🚀 शुरू करें!"}
          </button>
        </div>

        {/* Identity token */}
        <p className="mt-6 text-xs text-gray-400">🆔 24B1297</p>
      </div>
    </div>
  );
}
