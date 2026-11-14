import { Accessibility, Languages, MessageCircle, Navigation, Users } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TODAY_INDEX, TRIP } from "../data/sample";

/**
 * The trip: help for right now at the top, then the plan day by day,
 * with a plain-language "why this suits you" note on each item.
 */
export function Trip() {
  return (
    <>
      <ScreenTitle title={`${TRIP.destination}, ${TRIP.country}`} intro={TRIP.dates} />

      <section className="stack">
        <h2>Help during your trip</h2>
        <ActionCard
          icon={MessageCircle}
          tone="primary"
          title="Ask your assistant"
          text="Toilets, water, a place to sit, the way back"
          onClick={() => navigate("assistant")}
        />
        <ActionCard
          icon={Languages}
          title="Translate a sign or menu"
          text="Take a photo, read it in English"
          onClick={() => navigate("translate")}
        />
        <ActionCard
          icon={Navigation}
          title="Today, step by step"
          text="Your next stop and how to get there"
          onClick={() => navigate("today")}
        />
      </section>

      <h2 className="section-title">Your plan</h2>
      {TRIP.days.map((day, i) => (
        <section key={day.date} className="day">
          <h3>
            {day.date} <span className="muted">· {day.title}</span>
            {i === TODAY_INDEX && <span className="badge">Today</span>}
          </h3>
          <ol className="timeline">
            {day.items.map((item) => (
              <li key={item.time + item.title} className={`timeline-item ${item.kind}`}>
                <span className="time">{item.time}</span>
                <div>
                  <strong>{item.title}</strong>
                  {item.accessNote && (
                    <p className="access-note">
                      <Accessibility aria-hidden size={22} />
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
    </>
  );
}
