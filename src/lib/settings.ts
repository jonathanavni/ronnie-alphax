import { useSyncExternalStore } from "react";

/**
 * Text size preference, saved in localStorage. Applied as a class on <html>,
 * which scales the root font size — every size in styles.css is in rem, so everything grows.
 */
export type TextSize = "normal" | "large" | "xlarge";
export const TEXT_SIZES: { value: TextSize; label: string }[] = [
  { value: "normal", label: "A" },
  { value: "large", label: "A+" },
  { value: "xlarge", label: "A++" },
];

const KEY = "wayfinder.textSize";
const listeners = new Set<() => void>();

function read(): TextSize {
  try {
    const v = localStorage.getItem(KEY);
    return v === "large" || v === "xlarge" ? v : "normal";
  } catch {
    return "normal";
  }
}

function apply(size: TextSize) {
  document.documentElement.dataset.textSize = size;
}

apply(read());

export function setTextSize(size: TextSize) {
  try {
    localStorage.setItem(KEY, size);
  } catch {
    /* private mode — still apply for this visit */
  }
  apply(size);
  listeners.forEach((l) => l());
}

export function useTextSize(): TextSize {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
  );
}
