import { Armchair, Clock, GlassWater, Languages, MessageCircle, Pill, Toilet } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TODAY_INDEX, TRIP } from "../data/sample";

/** Assistance during the trip: what's next, how to get there, and quick help nearby. */
export function Today() {
  const day = TRIP.days[TODAY_INDEX];
  const next = day.items.find((i) => i.directions) ?? day.items[0];

  return (
    <>
      <ScreenTitle title="Today" intro={`${day.date} · ${day.title}`} />
      <section className="next-card">
        <span className="eyebrow">
          <Clock aria-hidden size={22} /> Next, at {next.time}
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

      <ActionCard icon={Pill} tone="warm" title="Insulin at 18:30" text="I'll remind you 15 minutes before" />

      <section className="stack">
        <h2>Need something now?</h2>
        <ActionCard icon={Toilet} title="Find a toilet" text="The nearest one without steps" onClick={() => navigate("assistant", "toilet")} />
        <ActionCard icon={GlassWater} title="Get a drink of water" text="Fountains and cafés nearby" onClick={() => navigate("assistant", "water")} />
        <ActionCard icon={Armchair} title="Sit down and rest" text="A bench or a quiet café" onClick={() => navigate("assistant", "tired")} />
        <ActionCard icon={Languages} title="Translate a sign or menu" text="Take a photo, read it in English" onClick={() => navigate("translate")} />
        <ActionCard icon={MessageCircle} title="Ask something else" text="Chat with your travel assistant" onClick={() => navigate("assistant")} />
      </section>
    </>
  );
}
