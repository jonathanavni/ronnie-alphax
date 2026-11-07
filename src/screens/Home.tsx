import { CalendarHeart, MessageCircle, Navigation, UserRound, Users } from "lucide-react";
import { ActionCard, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TRAVELLER, TRIP } from "../data/sample";

/** Home: a greeting and at most a handful of big, obvious choices. */
export function Home() {
  return (
    <>
      <ScreenTitle title={`Good morning, ${TRAVELLER.name}`} intro="What would you like to do?" />
      <div className="stack">
        <ActionCard
          icon={Navigation}
          tone="primary"
          title="Today in Lisbon"
          text="Your next stop and how to get there"
          onClick={() => navigate("today")}
        />
        <ActionCard
          icon={MessageCircle}
          title="Plan a new trip"
          text="Chat with your travel assistant"
          onClick={() => navigate("plan")}
        />
        <ActionCard
          icon={CalendarHeart}
          title={`My trip to ${TRIP.destination}`}
          text={TRIP.dates}
          onClick={() => navigate("trip")}
        />
        <ActionCard icon={Users} title="Family" text="Who can see your trip" onClick={() => navigate("family")} />
        <ActionCard icon={UserRound} title="About me" text="Your needs and settings" onClick={() => navigate("profile")} />
      </div>
    </>
  );
}
