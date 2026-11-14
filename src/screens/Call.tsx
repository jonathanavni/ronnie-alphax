import { useState } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { ScreenTitle } from "../components/ui";
import { goBack } from "../lib/router";
import { TRAVELLER } from "../data/sample";
import { T } from "../data/strings";

/**
 * A calm "are you sure?" step before any call, then a pretend "Calling…" screen.
 * `#/call/sarah`, `#/call/support`, `#/call/emergency`. No real call is ever made.
 */
export function Call({ param }: { param?: string }) {
  const [calling, setCalling] = useState(false);
  const sarah = TRAVELLER.family[0];
  const emergency = param === "emergency";

  const who =
    param === "sarah"
      ? { name: sarah.name, detail: `Your ${sarah.relation.toLowerCase()} · ${sarah.phone}` }
      : emergency
        ? { name: "112", detail: "The emergency number in Portugal: ambulance, police and fire." }
        : { name: "our support team", detail: "A real person answers, 24 hours a day, in English." };

  if (calling) {
    return (
      <>
        <ScreenTitle title={`Calling ${who.name}…`} intro={T.noRealCall} />
        <div className={`call-badge${emergency ? " danger" : ""}`} aria-hidden>
          <Phone size={44} />
        </div>
        <button type="button" className="btn danger" onClick={() => goBack("help")}>
          <PhoneOff aria-hidden size={26} />
          End call
        </button>
      </>
    );
  }

  return (
    <>
      <ScreenTitle title={`Call ${who.name}?`} intro={who.detail} />
      <div className="stack">
        <button type="button" className={`btn ${emergency ? "danger" : "primary"}`} onClick={() => setCalling(true)}>
          <Phone aria-hidden size={26} />
          Yes, call {who.name}
        </button>
        <button type="button" className="btn" onClick={() => goBack("help")}>
          No, go back
        </button>
      </div>
    </>
  );
}
