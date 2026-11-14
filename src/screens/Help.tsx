import { Hotel, Phone, Siren, UserRound } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TRAVELLER, TRIP } from "../data/sample";

/** Help is always one tap away. Calm wording, the most likely needs first, emergency clearly separate. */
export function Help() {
  const daughter = TRAVELLER.family[0];
  return (
    <>
      <ScreenTitle title="How can we help?" intro="Choose one. Nothing happens until you say yes." />
      <div className="stack">
        <ActionCard
          icon={Phone}
          tone="primary"
          title={`Call ${daughter.name}`}
          text={`Your ${daughter.relation.toLowerCase()}`}
          onClick={() => navigate("call", "sarah")}
        />
        <ActionCard
          icon={UserRound}
          title="Talk to a real person"
          text="Our support team, 24 hours a day"
          onClick={() => navigate("call", "support")}
        />
        <ActionCard
          icon={Hotel}
          title="Take me to my hotel"
          text={`Show the address of ${TRIP.hotel.name}`}
          onClick={() => navigate("driver")}
        />
      </div>
      <div className="emergency-block">
        <h2>In an emergency</h2>
        <button type="button" className="btn danger" onClick={() => navigate("call", "emergency")}>
          <Siren aria-hidden size={28} />
          Call 112
        </button>
      </div>
    </>
  );
}
