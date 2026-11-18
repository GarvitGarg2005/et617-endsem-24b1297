"use client";
// Interactive Animated Phonetics Articulation Canvas & Video Demonstrator
import React, { useState } from "react";
import AudioButton from "./AudioButton";

interface PhoneticsVisualizerProps {
  topic: "sha-sa" | "da" | "sentences";
  title: string;
}

export default function PhoneticsVisualizer({ topic, title }: PhoneticsVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"diagram" | "guide">("diagram");

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-2xl p-4 shadow-sm my-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎬</span>
          <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        </div>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("diagram")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              activeTab === "diagram" ? "bg-orange-600 text-white" : "bg-white text-orange-800"
            }`}
          >
            दृश्य मॉडल (Visual Model)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              activeTab === "guide" ? "bg-orange-600 text-white" : "bg-white text-orange-800"
            }`}
          >
            उच्चारण गाइड
          </button>
        </div>
      </div>

      {topic === "sha-sa" && (
        <div className="bg-white rounded-xl p-4 shadow-inner">
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Palatal Sha */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-3 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-blue-700">श</span>
              <span className="text-xs font-bold text-blue-900 mt-1">तालव्य ध्वनि (Palatal)</span>
              <div className="my-2 bg-blue-100 rounded-lg p-2 text-xs text-blue-800">
                जीभ को ऊपर तालू (Palate) की ओर मोड़ें
              </div>
              <AudioButton text="शेर" label="शेर सुनो" className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-1" />
            </div>

            {/* Dental Sa */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-green-700">स</span>
              <span className="text-xs font-bold text-green-900 mt-1">दन्त्य ध्वनि (Dental)</span>
              <div className="my-2 bg-green-100 rounded-lg p-2 text-xs text-green-800">
                जीभ को आगे ऊपरी दाँतों (Teeth) से छुआएं
              </div>
              <AudioButton text="सेब" label="सेब सुनो" className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-1" />
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-3">
            💡 <strong>भोजपुरी तुलना:</strong> भोजपुरी में दोनों को दाँत के पास से बोल दिया जाता है, हिंदी में तालू का प्रयोग करें।
          </p>
        </div>
      )}

      {topic === "da" && (
        <div className="bg-white rounded-xl p-4 shadow-inner">
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Retroflex Plosive Da */}
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-red-700">ड</span>
              <span className="text-xs font-bold text-red-900 mt-1">स्पर्श ध्वनि (Stop)</span>
              <div className="my-2 bg-red-100 rounded-lg p-2 text-xs text-red-800">
                जीभ तालू पर रुकती है (बिना बिंदी)
              </div>
              <AudioButton text="डर" label="डर सुनो" className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-1" />
            </div>

            {/* Retroflex Flap Da with Nukta */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-green-700">ड़</span>
              <span className="text-xs font-bold text-green-900 mt-1">उत्क्षिप्त ध्वनि (Flap)</span>
              <div className="my-2 bg-green-100 rounded-lg p-2 text-xs text-green-800">
                जीभ तालू से झटके से फिसलती है (नुक्ता युक्त)
              </div>
              <AudioButton text="लड़का" label="लड़का सुनो" className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-1" />
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-3">
            💡 <strong>याद रखें:</strong> 'सड़क', 'लड़का', 'पड़ोसी' में नीचे बिंदी (नुक्ता) अनिवार्य है।
          </p>
        </div>
      )}

      {topic === "sentences" && (
        <div className="bg-white rounded-xl p-4 shadow-inner">
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">"रमेश शाम को आया।"</p>
                <p className="text-xs text-gray-500">शाम (तालव्य श)</p>
              </div>
              <AudioButton text="रमेश शाम को आया।" label="सुनो" />
            </div>
            <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">"सड़क साफ़ और चौड़ी है।"</p>
                <p className="text-xs text-gray-500">सड़क (स + ड़ flap)</p>
              </div>
              <AudioButton text="सड़क साफ़ और चौड़ी है।" label="सुनो" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
