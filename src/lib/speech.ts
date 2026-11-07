/**
 * Read-aloud using the browser's built-in speech (no service, no key).
 * Slightly slower than default — easier to follow, especially with hearing aids.
 */
export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

export function speak(text: string, onEnd?: () => void) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.onend = () => onEnd?.();
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel();
}
