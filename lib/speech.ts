// Clean Hindi text for TTS by stripping emojis, dashes, bullets, and markup
export function cleanTextForSpeech(raw: string): string {
  if (!raw) return "";

  // Strip non-letter symbols, punctuation, emojis and markdown symbols cleanly
  let cleaned = raw.replace(/[*#_~`\-\–\—\•\>\<\(\)\[\]\{\}\:\;\"\'\|\\\/]/g, " ");
  
  // Filter out any characters outside Devanagari, basic numbers, and English letters
  cleaned = cleaned
    .split("")
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      // Devanagari Unicode range: 0x0900 - 0x097F
      // ASCII whitespace: 0x20
      // Basic latin: 65-90, 97-122
      return (code >= 0x0900 && code <= 0x097F) || (code >= 65 && code <= 122) || code === 32;
    })
    .join("");

  return cleaned.replace(/\s+/g, " ").trim();
}

// Robust Hindi Web Speech API Audio Player with audio fallback
export function speakHindi(text: string) {
  if (typeof window === "undefined") return;

  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return;

  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = "hi-IN";
      utterance.rate = 0.82; // Natural slow articulation for learners
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes("hi") ||
          v.lang.toLowerCase().includes("in") ||
          v.name.toLowerCase().includes("hindi")
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      window.speechSynthesis.speak(utterance);
      return;
    }
  } catch (e) {
    console.warn("SpeechSynthesis error:", e);
  }

  // Backup fallback: encoded Google TTS audio element
  try {
    const audio = new Audio(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        cleaned
      )}&tl=hi&client=tw-ob`
    );
    audio.play().catch((err) => console.log("Audio play fallback prevented:", err));
  } catch (err) {
    console.error("Audio fallback failed:", err);
  }
}
