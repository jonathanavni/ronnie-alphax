import { CalendarHeart, MessageCircle, Navigation, UserRound, Users } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TODAY_INDEX, TRAVELLER, TRIP } from "../data/sample";

/** Home: a greeting and at most a handful of big, obvious choices. */
export function Home() {
  return (
    <>
      <ScreenTitle
        title={`Good morning, ${TRAVELLER.name}`}
        intro={`It's day ${TODAY_INDEX + 1} of your ${TRIP.destination} trip. What would you like to do?`}
      />
      <div className="stack">
        <ActionCard
          icon={Navigation}
          tone="primary"
          title={`Today in ${TRIP.destination}`}
          text="Your next stop, and help nearby"
          onClick={() => navigate("today")}
        />
        <ActionCard
          icon={CalendarHeart}
          title={`My trip to ${TRIP.destination}`}
          text={TRIP.dates}
          onClick={() => navigate("trip")}
        />
        <ActionCard
          icon={MessageCircle}
          title="Plan a new trip"
          text="Chat with your travel assistant"
          onClick={() => navigate("plan")}
        />
        <ActionCard icon={Users} title="Family" text="Who can see your trip" onClick={() => navigate("family")} />
        <ActionCard icon={UserRound} title="About me" text="Your needs and text size" onClick={() => navigate("profile")} />
      </div>
    </>
  );
}
