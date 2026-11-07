import { Hotel, Phone, Siren, UserRound } from "lucide-react";
import { ActionCard, ScreenTitle, Todo } from "../components/ui";
import { TRAVELLER, TRIP } from "../data/sample";

/** Help is always one tap away. Calm wording, the most likely needs first, emergency clearly separate. */
export function Help() {
  const daughter = TRAVELLER.family[0];
  return (
    <>
      <ScreenTitle title="How can we help?" intro="Choose one. You can always come back." />
      <div className="stack">
        <ActionCard icon={Phone} tone="primary" title={`Call ${daughter.name}`} text={daughter.relation} onClick={() => {}} />
        <ActionCard icon={UserRound} title="Talk to a real person" text="Our support team, 24 hours a day" onClick={() => {}} />
        <ActionCard icon={Hotel} title="Take me to my hotel" text={TRIP.hotel.name} onClick={() => {}} />
      </div>
      <button type="button" className="emergency">
        <Siren aria-hidden size={28} />
        Emergency · call 112
      </button>
      <Todo
        items={[
          "Each option opens a calm confirm screen (\"Calling Sarah…\" with a big Cancel)",
          "'Take me to my hotel' → full-screen address in Portuguese to show a taxi driver",
          "Share my location with family (with clear consent)",
        ]}
      />
    </>
  );
}
