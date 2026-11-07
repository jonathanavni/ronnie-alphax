import type { ReactNode } from "react";
import { ChevronLeft, House, LifeBuoy, Luggage, MessageCircle } from "lucide-react";
import { navigate, type Page } from "../lib/router";
import { APP_NAME, T } from "../data/strings";

/**
 * The frame around every screen:
 * - top bar: a labelled Back button (never an icon alone) + an always-visible Help button
 * - bottom tab bar: 4 labelled tabs, big targets, current tab clearly marked
 */
const TABS: { page: Page; label: string; icon: typeof House }[] = [
  { page: "home", label: T.nav.home, icon: House },
  { page: "plan", label: T.nav.plan, icon: MessageCircle },
  { page: "trip", label: T.nav.trip, icon: Luggage },
  { page: "help", label: T.nav.help, icon: LifeBuoy },
];

/** Which tab is "current" for screens that aren't tabs themselves. */
const TAB_FOR: Partial<Record<Page, Page>> = { today: "trip", family: "trip", profile: "home", settings: "home" };

export function Shell({ page, children }: { page: Page; children: ReactNode }) {
  const current = TAB_FOR[page] ?? page;
  const isTab = TABS.some((t) => t.page === page);

  return (
    <div className="shell">
      <div className="demo-banner" role="note">{T.demoBanner}</div>
      <header className="topbar">
        {isTab ? (
          <span className="brand">{APP_NAME}</span>
        ) : (
          <button type="button" className="back-btn" onClick={() => history.back()}>
            <ChevronLeft aria-hidden size={28} />
            {T.back}
          </button>
        )}
        {page !== "help" && (
          <button type="button" className="help-btn" onClick={() => navigate("help")}>
            <LifeBuoy aria-hidden size={24} />
            {T.helpButton}
          </button>
        )}
      </header>

      <main className="screen" key={page}>
        {children}
      </main>

      <nav className="tabbar" aria-label="Main">
        {TABS.map(({ page: p, label, icon: Icon }) => (
          <button
            key={p}
            type="button"
            className={`tab${current === p ? " active" : ""}${p === "help" ? " tab-help" : ""}`}
            aria-current={current === p ? "page" : undefined}
            onClick={() => navigate(p)}
          >
            <Icon aria-hidden size={28} strokeWidth={current === p ? 2.4 : 2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
