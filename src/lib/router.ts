import { useEffect, useState } from "react";

/**
 * Tiny hash router (same idea as the chess tutor): "#/plan", "#/trip", …
 * Every screen is a shareable link, so a feedback session can jump straight to a flow,
 * and any static host works with no rewrite rules.
 *
 * A link can carry one extra word after the page, e.g. "#/assistant/toilet" or "#/call/sarah".
 * The screen receives it as `param`.
 */
export const PAGES = [
  "home",
  "profile",
  "plan",
  "trip",
  "today",
  "assistant",
  "translate",
  "help",
  "call",
  "driver",
  "family",
  "settings",
  "demo",
] as const;
export type Page = (typeof PAGES)[number];
export type Route = { page: Page; param?: string };

function parse(hash: string): Route {
  const [name, param] = hash.replace(/^#\/?/, "").split("/");
  const page = (PAGES as readonly string[]).includes(name) ? (name as Page) : "home";
  return { page, param: param || undefined };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(page: Page, param?: string) {
  window.location.hash = page === "home" ? "/" : `/${page}${param ? `/${param}` : ""}`;
  window.scrollTo({ top: 0 });
}

/** Back button. If the app was opened straight on this screen, there is nothing to go back to, so go to `fallback`. */
export function goBack(fallback: Page = "home") {
  if (window.history.length > 1) window.history.back();
  else navigate(fallback);
}
