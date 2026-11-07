import { ScreenTitle, Todo } from "../components/ui";
import { TRAVELLER } from "../data/sample";

/** Family collaboration: who can see the plan / location. The traveller stays in control. */
export function Family() {
  return (
    <>
      <ScreenTitle title="Family" intro="These people can help with your trip. You decide what they see." />
      <ul className="family-list">
        {TRAVELLER.family.map((f) => (
          <li key={f.name} className="family-card">
            <span className="avatar" aria-hidden>
              {f.name[0]}
            </span>
            <div>
              <strong>{f.name}</strong>
              <span className="muted">{f.relation}</span>
              <span>
                {f.canSeeTrip ? "Sees your plan" : "Can't see your plan"} ·{" "}
                {f.canSeeLocation ? "Sees where you are" : "Can't see where you are"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Todo
        items={[
          "Big on/off switches with words (\"On\" / \"Off\"), not just colour",
          "Family view mock: what Sarah sees on her phone (comments, 'I booked the taxi')",
          "Invite someone by text message",
        ]}
      />
    </>
  );
}
