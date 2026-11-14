/**
 * Read-aloud using the browser's built-in speech (no service, no key).
 * Slightly slower than default — easier to follow, especially with hearing aids.
 */
export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

/** `lang` is optional, e.g. "pt-PT" to read the hotel address to a taxi driver in Portuguese. */
export function speak(text: string, onEnd?: () => void, lang?: string) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  if (lang) u.lang = lang;
  u.onend = () => onEnd?.();
  u.onerror = () => onEnd?.();
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel();
}
