import { Settings } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { NEED_ICONS } from "../components/needIcons";
import { navigate } from "../lib/router";
import { TRAVELLER } from "../data/sample";

/** "About me": the personal needs the concierge plans around. */
export function Profile() {
  return (
    <>
      <ScreenTitle title="About me" intro="Your travel assistant uses this to plan trips that suit you." />
      <section className="stack">
        <h2>What I remember about you</h2>
        <ul className="need-list">
          {TRAVELLER.needs.map((n) => {
            const Icon = NEED_ICONS[n.icon];
            return (
              <li key={n.label} className="need">
                <span className="action-icon">
                  <Icon aria-hidden size={28} />
                </span>
                <span>
                  <strong>{n.label}</strong>
                  <span>{n.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="muted">Travelling with: {TRAVELLER.companions.join(", ")}</p>
      </section>
      <ActionCard icon={Settings} title="Text size" text="Make everything bigger" onClick={() => navigate("settings")} />
    </>
  );
}
