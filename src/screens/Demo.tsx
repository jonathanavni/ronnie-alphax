import { ScreenTitle } from "../components/ui";
import { navigate, type Page } from "../lib/router";

/**
 * Presenter index (#/demo) — for Ronnie during feedback sessions, not for testers.
 * Jump straight to any flow without clicking through.
 */
const FLOWS: { page: Page; title: string; what: string }[] = [
  { page: "profile", title: "About me", what: "Personal needs the plan is built around" },
  { page: "plan", title: "Plan a trip (chat)", what: "Concierge suggests a destination and a gentle plan" },
  { page: "trip", title: "My trip", what: "Day-by-day plan with accessibility notes" },
  { page: "today", title: "Today (during the trip)", what: "Next stop + step-by-step directions" },
  { page: "help", title: "Help", what: "Call family, real person, back to hotel, emergency" },
  { page: "family", title: "Family", what: "Who can see the plan and location" },
  { page: "settings", title: "Text size", what: "Make everything bigger" },
];

export function Demo() {
  return (
    <>
      <ScreenTitle title="Demo flows" intro="Presenter shortcuts. Each screen also has its own link, e.g. #/plan." />
      <ol className="demo-list">
        {FLOWS.map((f) => (
          <li key={f.page}>
            <button type="button" onClick={() => navigate(f.page)}>
              <strong>{f.title}</strong>
              <span>{f.what}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
