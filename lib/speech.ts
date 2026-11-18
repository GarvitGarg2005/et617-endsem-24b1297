// Robust Hindi Web Speech API Audio Player with audio fallback
export function speakHindi(text: string) {
  if (typeof window === "undefined") return;

  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.8;
      utterance.pitch = 1.0;

      // Force sound on browsers where voices load asynchronously
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

  // Backup fallback: Google Translate TTS audio element
  try {
    const audio = new Audio(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
      )}&tl=hi&client=tw-ob`
    );
    audio.play().catch((err) => console.log("Audio play fallback prevented:", err));
  } catch (err) {
    console.error("Audio fallback failed:", err);
  }
}
