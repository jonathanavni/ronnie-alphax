import { Settings } from "lucide-react";
import { ActionCard, ScreenTitle, Todo } from "../components/ui";
import { NEED_ICONS } from "../components/needIcons";
import { navigate } from "../lib/router";
import { TRAVELLER } from "../data/sample";

/** "About me": the personal needs the concierge plans around. */
export function Profile() {
  return (
    <>
      <ScreenTitle title="About me" intro="Your travel assistant uses this to plan trips that suit you." />
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
      <ActionCard icon={Settings} title="Text size" text="Make everything bigger" onClick={() => navigate("settings")} />
      <Todo
        items={[
          "First-time setup: one question per screen (walking, health, hearing & sight, food, pace, who's coming)",
          "Big answer cards, a progress line (\"Question 2 of 6\"), Back on every step, Skip allowed",
          "Option for a family member to fill this in together",
        ]}
      />
    </>
  );
}
