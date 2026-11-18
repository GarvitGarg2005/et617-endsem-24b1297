"use client";
// Interactive Animated Phonetics Articulation Canvas with real-time dynamic switching
import React, { useState } from "react";
import AudioButton from "./AudioButton";

interface PhoneticsVisualizerProps {
  topic: "sha-sa" | "da" | "sentences";
  title: string;
}

export default function PhoneticsVisualizer({ topic, title }: PhoneticsVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"diagram" | "guide">("diagram");
  const [selectedPhoneme, setSelectedPhoneme] = useState<string>(
    topic === "sha-sa" ? "sha" : topic === "da" ? "da_dot" : "s1"
  );

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-300 rounded-2xl p-4 shadow-md my-4">
      {/* Header & Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3 pb-2 border-b border-orange-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗣️</span>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{title}</h3>
            <p className="text-xs text-orange-700">नीचे दिए गए बटनों को दबाकर आकृति देखें</p>
          </div>
        </div>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("diagram")}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all shadow-xs ${
              activeTab === "diagram" ? "bg-orange-600 text-white" : "bg-white text-orange-800 hover:bg-orange-100"
            }`}
          >
            🎨 मुख आकृति (Visual Model)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all shadow-xs ${
              activeTab === "guide" ? "bg-orange-600 text-white" : "bg-white text-orange-800 hover:bg-orange-100"
            }`}
          >
            📋 नियम व गाइड
          </button>
        </div>
      </div>

      {/* TOPIC 1: SHA vs SA */}
      {topic === "sha-sa" && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {activeTab === "diagram" ? (
            <div>
              {/* Interactive Selector Buttons */}
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
                  <span className="text-xs font-bold text-blue-900">तालव्य ध्वनि (Palatal)</span>
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
                  <span className="text-xs font-bold text-green-900">दन्त्य ध्वनि (Dental)</span>
                </button>
              </div>

              {/* Dynamic Anatomical Diagram Box */}
              {selectedPhoneme === "sha" ? (
                <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 text-center animate-fade-in">
                  <div className="text-5xl mb-2">👅 ➔ 🏛️</div>
                  <h4 className="font-extrabold text-blue-900 text-base mb-1">श (तालव्य ध्वनि) की स्थिति:</h4>
                  <p className="text-xs text-blue-800 leading-relaxed mb-3">
                    जीभ की नोक को मुँह की छत (कठोर तालू) के पास उठाएं। हवा दोनों तरफ से सीटी की हल्की आवाज़ के साथ निकलती है।
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-md text-blue-900 border border-blue-200">
                      उदाहरण: शेर, शक्ति, शाम
                    </span>
                    <AudioButton text="शेर शक्तिशाली है" label="वाक्य सुनो" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center animate-fade-in">
                  <div className="text-5xl mb-2">👅 ➔ 🦷</div>
                  <h4 className="font-extrabold text-green-900 text-base mb-1">स (दन्त्य ध्वनि) की स्थिति:</h4>
                  <p className="text-xs text-green-800 leading-relaxed mb-3">
                    जीभ को बिल्कुल आगे लाएं और ऊपर वाले दाँतों के पीछे रखें। हवा दाँतों के बीच से सरसराते हुए निकलती है।
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-md text-green-900 border border-green-200">
                      उदाहरण: सेब, समय, सड़क
                    </span>
                    <AudioButton text="सेब समय पर खाओ" label="वाक्य सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-700 space-y-2 leading-relaxed">
              <p className="font-bold text-gray-900">📌 भोजपुरी भाषियों के लिए मुख्य नियम:</p>
              <p>1. भोजपुरी में सामान्यतः केवल 'स' की ध्वनि अधिक प्रचलित है, जिससे 'श' वाले शब्दों को भी 'स' बोल दिया जाता है (जैसे शादी को सादी)।</p>
              <p>2. मानक लिखित हिंदी में दोनों के अर्थ अलग होते हैं: <strong>शेर</strong> (जंगल का राजा) 🦁 बनाम <strong>सेर</strong> (नाप-तौल) ⚖️।</p>
            </div>
          )}
        </div>
      )}

      {/* TOPIC 2: DA vs DA WITH NUKTA */}
      {topic === "da" && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {activeTab === "diagram" ? (
            <div>
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
                  <span className="text-xs font-bold text-red-900">स्पर्श ध्वनि (बिना बिंदी)</span>
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
                  <span className="text-xs font-bold text-green-900">उत्क्षिप्त ध्वनि (नुक्ता युक्त)</span>
                </button>
              </div>

              {selectedPhoneme === "da_plain" ? (
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-center animate-fade-in">
                  <div className="text-5xl mb-2">🛑 ➔ 👅</div>
                  <h4 className="font-extrabold text-red-900 text-base mb-1">ड (Plosive Stop):</h4>
                  <p className="text-xs text-red-800 leading-relaxed mb-3">
                    जीभ तालू पर जाकर हवा को पूरी तरह रोकती है और फिर झटके से खुलती है। यह शब्द के प्रारंभ में आता है।
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-md text-red-900 border border-red-200">
                      उदाहरण: डर, डमरू, डिब्बा
                    </span>
                    <AudioButton text="डमरू बजाओ" label="सुनो" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center animate-fade-in">
                  <div className="text-5xl mb-2">⚡ ➔ 👅</div>
                  <h4 className="font-extrabold text-green-900 text-base mb-1">ड़ (Retroflex Flap):</h4>
                  <p className="text-xs text-green-800 leading-relaxed mb-3">
                    जीभ तालू को केवल छूकर तेज़ी से नीचे फिसलती है। इसके नीचे <strong>नुक्ता (बिंदी)</strong> होना अनिवार्य है!
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-md text-green-900 border border-green-200">
                      उदाहरण: लड़का, सड़क, पड़ोसी
                    </span>
                    <AudioButton text="लड़का सड़क पर दौड़ा" label="सुनो" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-700 space-y-2 leading-relaxed">
              <p className="font-bold text-gray-900">📌 नुक्ता का स्वर्ण नियम:</p>
              <p>• 'ड़' कभी भी किसी शब्द के पहले अक्षर के रूप में नहीं आता (हमेशा बीच में या अंत में आता है: सड़क, पेड़, लड़का)।</p>
              <p>• शब्द के प्रारंभ में हमेशा बिना नुक्ते वाला 'ड' आता है (डमरू, डर, डिब्बा)।</p>
            </div>
          )}
        </div>
      )}

      {/* TOPIC 3: SENTENCES */}
      {topic === "sentences" && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="space-y-2.5">
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
                <p className="text-xs text-orange-800">सड़क (दन्त्य स + नुक्ता ड़)</p>
              </div>
              <AudioButton text="सड़क साफ़ और चौड़ी है।" label="सुनो" />
            </div>

            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">"लड़का पेड़ के पास खड़ा है।"</p>
                <p className="text-xs text-orange-800">लड़का, पेड़, खड़ा (तीनों में ड़)</p>
              </div>
              <AudioButton text="लड़का पेड़ के पास खड़ा है।" label="सुनो" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
