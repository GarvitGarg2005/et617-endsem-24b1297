"use client";
// Hindi On-Screen Virtual Keyboard and Transliteration Helper
import React from "react";

interface HindiKeyboardProps {
  onInsert: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const HINDI_CHARACTERS = [
  // Primary target letters for this module
  "श", "स", "ष", "ड", "ड़", "ढ", "ढ़",
  // Common vowels & matras
  "ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", "ँ", "्",
  // Common consonants
  "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "ह"
];

// Quick shortcut words for one-tap answering
const QUICK_WORDS = ["शेर", "सेर", "लड़का", "सड़क", "पड़ोसी", "शक्ति", "शादी", "सादी", "शाम", "नमस्ते"];

export default function HindiKeyboard({ onInsert, onBackspace, onClear }: HindiKeyboardProps) {
  return (
    <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 my-2 shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
          ⌨️ हिंदी कीबोर्ड (One-tap Devanagari input)
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onBackspace}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2.5 py-1 rounded font-bold"
          >
            ⌫ मिटाओ
          </button>
          <button
            type="button"
            onClick={onClear}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
          >
            साफ़
          </button>
        </div>
      </div>

      {/* Target Focus Letters (Highlighted) */}
      <div className="flex flex-wrap gap-1.5 mb-2 pb-2 border-b border-amber-200">
        <span className="text-xs font-semibold text-orange-800 self-center mr-1">मुख्य अक्षर:</span>
        {["श", "स", "ड़", "ड"].map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsert(char)}
            className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-extrabold text-base w-9 h-9 rounded-lg shadow-sm flex items-center justify-center transition-transform"
          >
            {char}
          </button>
        ))}
      </div>

      {/* Quick Word chips */}
      <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-amber-200">
        {QUICK_WORDS.map((word) => (
          <button
            key={word}
            type="button"
            onClick={() => onInsert(word + " ")}
            className="bg-white hover:bg-amber-50 active:scale-95 text-amber-900 text-xs px-2 py-1 rounded-md border border-amber-200 font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Standard Hindi Character Matrix */}
      <div className="grid grid-cols-8 sm:grid-cols-12 gap-1 text-center">
        {HINDI_CHARACTERS.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsert(char)}
            className="bg-white hover:bg-orange-50 active:scale-95 text-gray-800 text-sm font-semibold py-1.5 rounded border border-amber-200 shadow-2xs transition-transform"
          >
            {char}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onInsert(" ")}
          className="col-span-4 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold py-1.5 rounded border border-amber-200"
        >
          ␣ स्पेस (Space)
        </button>
      </div>
    </div>
  );
}
