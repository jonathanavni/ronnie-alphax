import { Accessibility, Users } from "lucide-react";
import { ActionCard, ScreenTitle, Todo } from "../components/ui";
import { navigate } from "../lib/router";
import { TRIP } from "../data/sample";

/** The trip plan, day by day, with a plain-language "why this suits you" note on each item. */
export function Trip() {
  return (
    <>
      <ScreenTitle title={`${TRIP.destination}, ${TRIP.country}`} intro={TRIP.dates} />
      {TRIP.days.map((day) => (
        <section key={day.date} className="day">
          <h2>
            {day.date} <span className="muted">· {day.title}</span>
          </h2>
          <ol className="timeline">
            {day.items.map((item) => (
              <li key={item.time + item.title} className={`timeline-item ${item.kind}`}>
                <span className="time">{item.time}</span>
                <div>
                  <strong>{item.title}</strong>
                  {item.accessNote && (
                    <p className="access-note">
                      <Accessibility aria-hidden size={20} />
                      {item.accessNote}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <ActionCard icon={Users} title="Shared with family" text="Sarah and Tom can see this plan" onClick={() => navigate("family")} />
      <Todo items={["Tap an item to see details, map and 'Ask about this'", "Packing list (with medication) before the trip"]} />
    </>
  );
}
