// Web Speech API helper for Text-to-Speech in Hindi
export function speakHindi(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN"; // Hindi India
  utterance.rate = 0.85; // Slightly slower for clear educational articulation
  utterance.pitch = 1.0;

  // Try to find a Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const hiVoice = voices.find(v => v.lang.includes("hi") || v.lang.includes("IN"));
  if (hiVoice) {
    utterance.voice = hiVoice;
  }

  window.speechSynthesis.speak(utterance);
}
