import { Clock, MessageCircle, Pill } from "lucide-react";
import { ActionCard, ScreenTitle, Todo } from "../components/ui";
import { navigate } from "../lib/router";
import { TRIP } from "../data/sample";

/** Flow 2 — assistance during the trip: what's next, and how to get there, step by step. */
export function Today() {
  const day = TRIP.days[1];
  const next = day.items.find((i) => i.directions) ?? day.items[0];

  return (
    <>
      <ScreenTitle title="Today" intro={`${day.date} · ${day.title}`} />
      <section className="next-card">
        <span className="eyebrow">
          <Clock aria-hidden size={20} /> Next at {next.time}
        </span>
        <h2>{next.title}</h2>
        {next.directions && (
          <ol className="steps">
            {next.directions.map((d, i) => (
              <li key={d}>
                <span className="step-num">{i + 1}</span>
                {d}
              </li>
            ))}
          </ol>
        )}
      </section>
      <div className="stack">
        <ActionCard icon={Pill} tone="warm" title="Insulin at 18:30" text="We'll remind you 15 minutes before" onClick={() => {}} />
        <ActionCard icon={MessageCircle} title="Ask your assistant" text="“I'm tired” · “Where is a toilet?”" onClick={() => navigate("plan")} />
      </div>
      <Todo
        items={[
          "In-trip chat scripts: tired / toilet / lost / change plans",
          "'Show the driver' card with the hotel address in Portuguese",
          "Gentle reminders (medication, leave in 10 min)",
        ]}
      />
    </>
  );
}
