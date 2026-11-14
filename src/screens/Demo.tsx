import { ScreenTitle } from "../components/ui";
import { navigate, type Page } from "../lib/router";

/**
 * Presenter index (#/demo) — for Ronnie during feedback sessions, not for testers.
 * Jump straight to any flow without clicking through.
 */
const FLOWS: { page: Page; param?: string; title: string; what: string }[] = [
  { page: "profile", title: "About me", what: "Personal needs the plan is built around" },
  { page: "plan", title: "Plan a trip (chat)", what: "Concierge suggests a destination and a gentle plan" },
  { page: "trip", title: "My trip", what: "Help during the trip + day-by-day plan" },
  { page: "today", title: "Today (during the trip)", what: "Next stop, directions, quick help buttons" },
  { page: "assistant", title: "In-trip assistant (chat)", what: "Ask for a toilet, water, a seat, the way back" },
  { page: "assistant", param: "toilet", title: "…“Where is the nearest toilet?”", what: "Opens straight on the answer" },
  { page: "assistant", param: "water", title: "…“Where can I get a drink of water?”", what: "Opens straight on the answer" },
  { page: "translate", title: "Translate a sign or menu", what: "Pretend photo, then the English translation" },
  { page: "translate", param: "menu", title: "…translate a menu", what: "Opens straight on the camera" },
  { page: "help", title: "Help", what: "Call family, real person, back to hotel, emergency" },
  { page: "driver", title: "Show the driver", what: "Hotel address in Portuguese, very large" },
  { page: "family", title: "Family", what: "Who can see the plan and location" },
  { page: "settings", title: "Text size", what: "Make everything bigger" },
];

export function Demo() {
  return (
    <>
      <ScreenTitle title="Demo flows" intro="Presenter shortcuts. Each screen also has its own link, e.g. #/plan." />
      <ol className="demo-list">
        {FLOWS.map((f) => (
          <li key={f.title}>
            <button type="button" onClick={() => navigate(f.page, f.param)}>
              <strong>{f.title}</strong>
              <span>{f.what}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
