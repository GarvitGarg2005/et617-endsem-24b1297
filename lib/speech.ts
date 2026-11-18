// Bulletproof Hindi Text-to-Speech Engine
// Supports Web Speech API with automatic synthesis unlocking and reliable HTML5 Audio fallback

export function cleanTextForSpeech(raw: string): string {
  if (!raw) return "";

  let cleaned = raw
    // Remove markdown links or formatting symbols
    .replace(/[*#_~`\-\–\—\•\>\<\(\)\[\]\{\}\:\;\"\'\|\\\/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Strip emojis and non-alphanumeric/non-Devanagari characters
  cleaned = cleaned
    .split("")
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      // Devanagari range: 0x0900 - 0x097F
      // Latin letters: 65-90, 97-122
      // Numbers: 48-57, Space: 32
      return (code >= 0x0900 && code <= 0x097F) || (code >= 65 && code <= 122) || (code >= 48 && code <= 57) || code === 32;
    })
    .join("");

  return cleaned.replace(/\s+/g, " ").trim();
}

export function speakHindi(text: string) {
  if (typeof window === "undefined") return;

  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return;

  // 1. Try Web Speech API
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = "hi-IN";
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      // Select a Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace("_", "-").includes("hi") ||
          v.lang.toLowerCase().includes("in") ||
          v.name.toLowerCase().includes("hindi")
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      let spoken = false;
      utterance.onstart = () => {
        spoken = true;
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error, falling back to audio stream:", e);
        playAudioFallback(cleaned);
      };

      window.speechSynthesis.speak(utterance);

      // If speech synthesis doesn't trigger within 500ms (common Chrome mobile bug), use fallback
      setTimeout(() => {
        if (!spoken && window.speechSynthesis.speaking === false) {
          playAudioFallback(cleaned);
        }
      }, 500);

      return;
    } catch (e) {
      console.warn("Web Speech API failed, using fallback:", e);
    }
  }

  // 2. Direct fallback
  playAudioFallback(cleaned);
}

function playAudioFallback(text: string) {
  try {
    const encoded = encodeURIComponent(text);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=tw-ob`;
    const audio = new Audio(audioUrl);
    audio.play().catch((err) => {
      console.log("Audio stream playback failed:", err);
    });
  } catch (err) {
    console.error("Audio playback error:", err);
  }
}
