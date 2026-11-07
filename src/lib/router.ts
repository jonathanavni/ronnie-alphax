import { useEffect, useState } from "react";

/**
 * Tiny hash router (same idea as the chess tutor): "#/plan", "#/trip", …
 * Every screen is a shareable link, so a feedback session can jump straight to a flow,
 * and any static host works with no rewrite rules.
 */
export const PAGES = ["home", "profile", "plan", "trip", "today", "help", "family", "settings", "demo"] as const;
export type Page = (typeof PAGES)[number];

function parse(hash: string): Page {
  const name = hash.replace(/^#\/?/, "").split("/")[0];
  return (PAGES as readonly string[]).includes(name) ? (name as Page) : "home";
}

export function useRoute(): Page {
  const [page, setPage] = useState<Page>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => setPage(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return page;
}

export function navigate(page: Page) {
  window.location.hash = page === "home" ? "/" : `/${page}`;
  window.scrollTo({ top: 0 });
}
