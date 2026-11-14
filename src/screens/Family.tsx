import { useState } from "react";
import { ScreenTitle } from "../components/ui";
import { TRAVELLER } from "../data/sample";

/** Family collaboration: who can see the plan / location. The traveller stays in control. */
export function Family() {
  // Kept only while the screen is open: it is a prototype, nothing is saved.
  const [family, setFamily] = useState(TRAVELLER.family);
  const toggle = (name: string, key: "canSeeTrip" | "canSeeLocation") =>
    setFamily((list) => list.map((f) => (f.name === name ? { ...f, [key]: !f[key] } : f)));

  return (
    <>
      <ScreenTitle title="Family" intro="These people can help with your trip. You decide what they see." />
      <ul className="family-list">
        {family.map((f) => (
          <li key={f.name} className="family-card">
            <div className="family-head">
              <span className="avatar" aria-hidden>
                {f.name[0]}
              </span>
              <div>
                <strong>{f.name}</strong>
                <span className="muted">Your {f.relation.toLowerCase()}</span>
              </div>
            </div>
            <Switch label={`${f.name} can see your plan`} on={f.canSeeTrip} onChange={() => toggle(f.name, "canSeeTrip")} />
            <Switch
              label={`${f.name} can see where you are`}
              on={f.canSeeLocation}
              onChange={() => toggle(f.name, "canSeeLocation")}
            />
          </li>
        ))}
      </ul>
      <p className="muted">You can change this at any time. Your family can suggest changes, but only you decide.</p>
    </>
  );
}

/** An on/off switch that says "On" or "Off" in words, so colour is never the only signal. */
function Switch({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} className={`switch-row${on ? " on" : ""}`} onClick={onChange}>
      <span>{label}</span>
      <span className="switch" aria-hidden>
        <span className="switch-knob" />
      </span>
      <strong className="switch-word">{on ? "On" : "Off"}</strong>
    </button>
  );
}
