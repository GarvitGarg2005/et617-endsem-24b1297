"use client";
// Universal Audio Speaker Button Component with visual ripple and sound feedback
import React, { useState } from "react";
import { speakHindi } from "@/lib/speech";

interface AudioButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function AudioButton({ text, label, className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(true);
    speakHindi(text);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`inline-flex items-center justify-center gap-1 active:scale-95 transition-all select-none cursor-pointer ${
        className || "bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2 text-xs shadow-md"
      }`}
      title={`सुनो: ${text}`}
    >
      <span className={isPlaying ? "animate-ping inline-block" : ""}>🔊</span>
      {label && <span className="text-xs font-bold">{label}</span>}
    </button>
  );
}
