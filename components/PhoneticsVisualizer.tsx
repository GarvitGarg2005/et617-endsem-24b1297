"use client";
// Interactive Animated Phonetics Articulation Canvas with Embedded YouTube Demos & Audio
import React, { useState } from "react";
import AudioButton from "./AudioButton";

interface PhoneticsVisualizerProps {
  topic: "sha-sa" | "da" | "sentences";
  title: string;
}

export default function PhoneticsVisualizer({ topic, title }: PhoneticsVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"video" | "diagram" | "guide">("video");
  const [selectedPhoneme, setSelectedPhoneme] = useState<string>(
    topic === "sha-sa" ? "sha" : topic === "da" ? "da_dot" : "s1"
  );

  // High-quality YouTube video demonstrations for mouth/tongue articulation
  const videoUrls = {
    "sha-sa": "https://www.youtube-nocookie.com/embed/2v-N9A0yD1o", // Hindi Sha vs Sa pronunciation demonstration
    "da": "https://www.youtube-nocookie.com/embed/8Fk7Qyv7x7U",     // Hindi Nukta Da vs Dda tongue position
    "sentences": "https://www.youtube-nocookie.com/embed/H0mD0qW1p5c" // Full sentence articulation in Hindi
  };

  const directLinks = {
    "sha-sa": "https://www.youtube.com/results?search_query=hindi+sha+and+sa+pronunciation+tongue+position",
    "da": "https://www.youtube.com/results?search_query=hindi+da+and+dda+nukta+tongue+position",
    "sentences": "https://www.youtube.com/results?search_query=hindi+varnamala+pronunciation+mouth+movement"
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-300 rounded-2xl p-4 shadow-md my-4">
      {/* Header & Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3 pb-2 border-b border-orange-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📺</span>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{title}</h3>
            <p className="text-xs text-orange-700">जीभ और मुख की सही स्थिति (Tongue Position Demo)</p>
          </div>
        </div>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all shadow-xs ${
              activeTab === "video" ? "bg-red-600 text-white" : "bg-white text-red-800 hover:bg-red-50"
            }`}
          >
            ▶️ वीडियो गाइड
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("diagram")}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all shadow-xs ${
              activeTab === "diagram" ? "bg-orange-600 text-white" : "bg-white text-orange-800 hover:bg-orange-100"
            }`}
          >
            🎨 मुख आकृति
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all shadow-xs ${
              activeTab === "guide" ? "bg-orange-600 text-white" : "bg-white text-orange-800 hover:bg-orange-100"
            }`}
          >
            📋 नियम
          </button>
        </div>
      </div>

      {/* TAB 1: YOUTUBE VIDEO LESSON */}
      {activeTab === "video" && (
        <div className="bg-white rounded-xl p-3 shadow-inner">
          <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video shadow-md">
            <iframe
              className="w-full h-full"
              src={videoUrls[topic]}
              title="Tongue Positioning & Articulation Demonstration"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-600">
              <span className="font-bold text-gray-800">💡 क्या देखना है:</span> ध्यान दें कि ध्वनि निकालते समय जीभ तालू को छूती है या दाँतों को।
            </div>
            <a
              href={directLinks[topic]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold border border-red-200"
            >
              YouTube पर खोलें ↗
            </a>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE DIAGRAMS */}
      {activeTab === "diagram" && (
        <div>
          {topic === "sha-sa" && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSelectedPhoneme("sha")}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    selectedPhoneme === "sha"
                      ? "bg-blue-100 border-blue-600 shadow-sm scale-102"
                      : "bg-gray-50 border-gray-200 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-3xl font-extrabold text-blue-700 block">श (sha)</span>
                  <span className="text-xs font-bold text-blue-900">तालव्य (जीभ ➔ तालू)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPhoneme("sa")}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    selectedPhoneme === "sa"
                      ? "bg-green-100 border-green-600 shadow-sm scale-102"
                      : "bg-gray-50 border-gray-200 hover:bg-green-50"
                  }`}
                >
                  <span className="text-3xl font-extrabold text-green-700 block">स (sa)</span>
                  <span className="text-xs font-bold text-green-900">दन्त्य (जीभ ➔ दाँत)</span>
                </button>
              </div>

              {selectedPhoneme === "sha" ? (
                <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 text-center">
                  <div className="text-5xl mb-2">👅 ➔ 🏛️</div>
                  <h4 className="font-extrabold text-blue-900 text-base mb-1">श (तालव्य ध्वनि):</h4>
                  <p className="text-xs text-blue-800 leading-relaxed mb-3">
                    जीभ की नोक को मुँह की छत (कठोर तालू) के पास उठाएं।
                  </p>
                  <div className="flex justify-center gap-2 items-center">
                    <AudioButton text="शेर" label="शेर सुनो" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                    <AudioButton text="शक्ति" label="शक्ति सुनो" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center">
                  <div className="text-5xl mb-2">👅 ➔ 🦷</div>
                  <h4 className="font-extrabold text-green-900 text-base mb-1">स (दन्त्य ध्वनि):</h4>
                  <p className="text-xs text-green-800 leading-relaxed mb-3">
                    जीभ को बिल्कुल आगे लाएं और ऊपर वाले दाँतों के पीछे रखें।
                  </p>
                  <div className="flex justify-center gap-2 items-center">
                    <AudioButton text="सेब" label="सेब सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                    <AudioButton text="समय" label="समय सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              )}
            </div>
          )}

          {topic === "da" && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSelectedPhoneme("da_plain")}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    selectedPhoneme === "da_plain"
                      ? "bg-red-100 border-red-600 shadow-sm scale-102"
                      : "bg-gray-50 border-gray-200 hover:bg-red-50"
                  }`}
                >
                  <span className="text-3xl font-extrabold text-red-700 block">ड (Da)</span>
                  <span className="text-xs font-bold text-red-900">स्पर्श (बिना नुक्ता)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPhoneme("da_dot")}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    selectedPhoneme === "da_dot"
                      ? "bg-green-100 border-green-600 shadow-sm scale-102"
                      : "bg-gray-50 border-gray-200 hover:bg-green-50"
                  }`}
                >
                  <span className="text-3xl font-extrabold text-green-700 block">ड़ (ṛa)</span>
                  <span className="text-xs font-bold text-green-900">उत्क्षिप्त (नुक्ते वाला)</span>
                </button>
              </div>

              {selectedPhoneme === "da_plain" ? (
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-center">
                  <div className="text-5xl mb-2">🛑 ➔ 👅</div>
                  <h4 className="font-extrabold text-red-900 text-base mb-1">ड (Plosive Stop):</h4>
                  <p className="text-xs text-red-800 leading-relaxed mb-3">
                    जीभ तालू पर जाकर रुकती है और फिर खुलती है (डमरू, डर)।
                  </p>
                  <div className="flex justify-center gap-2 items-center">
                    <AudioButton text="डमरू" label="डमरू सुनो" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                    <AudioButton text="डर" label="डर सुनो" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center">
                  <div className="text-5xl mb-2">⚡ ➔ 👅</div>
                  <h4 className="font-extrabold text-green-900 text-base mb-1">ड़ (Retroflex Flap):</h4>
                  <p className="text-xs text-green-800 leading-relaxed mb-3">
                    जीभ तालू को केवल छूकर तेज़ी से नीचे फिसलती है।
                  </p>
                  <div className="flex justify-center gap-2 items-center">
                    <AudioButton text="लड़का" label="लड़का सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                    <AudioButton text="सड़क" label="सड़क सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              )}
            </div>
          )}

          {topic === "sentences" && (
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">"रमेश शाम को बाज़ार गया।"</p>
                  <p className="text-xs text-orange-800">शाम (तालव्य श)</p>
                </div>
                <AudioButton text="रमेश शाम को बाज़ार गया।" label="सुनो" />
              </div>
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">"सड़क साफ़ और चौड़ी है।"</p>
                  <p className="text-xs text-orange-800">सड़क (स + ड़)</p>
                </div>
                <AudioButton text="सड़क साफ़ और चौड़ी है।" label="सुनो" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RULES & GUIDES */}
      {activeTab === "guide" && (
        <div className="bg-white rounded-xl p-4 shadow-sm text-xs text-gray-700 space-y-2 leading-relaxed">
          <p className="font-bold text-gray-900">📌 मुख्य नियम:</p>
          <p>• <strong>श (Sha):</strong> तालू (roof of mouth) के पास से बोली जाती है।</p>
          <p>• <strong>स (Sa):</strong> दाँतों (teeth) के पीछे से बोली जाती है।</p>
          <p>• <strong>ड़ (ṛa):</strong> नुक्ते (बिंदी) के साथ हमेशा शब्द के बीच या अंत में आता है।</p>
        </div>
      )}
    </div>
  );
}
