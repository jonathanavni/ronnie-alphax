import { Phone } from "lucide-react";
import { ReadAloud, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TRAVELLER, TRIP } from "../data/sample";

/** "Take me to my hotel": the hotel address in Portuguese, in very large text, to show a taxi driver. */
export function Driver() {
  const { hotel } = TRIP;
  return (
    <>
      <ScreenTitle title="Show this to your driver" intro="It asks, in Portuguese, to take you to your hotel." />
      <div className="driver-card" lang="pt">
        {hotel.localAddress}
      </div>
      <p>
        <strong>In English:</strong> Please take me to {hotel.name}, {hotel.address}.
      </p>
      <div className="stack">
        <ReadAloud text={hotel.localAddress} lang="pt-PT" label="Say it in Portuguese" className="btn primary" />
        <button type="button" className="btn" onClick={() => navigate("call", "sarah")}>
          <Phone aria-hidden size={24} />
          Call {TRAVELLER.family[0].name}
        </button>
      </div>
    </>
  );
}
