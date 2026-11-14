import { Chat } from "../components/Chat";
import { IN_TRIP, IN_TRIP_MENU } from "../data/scripts";

/**
 * Help during the trip: ask the assistant for a toilet, water, a seat, directions…
 * `#/assistant` opens with "What do you need?".
 * `#/assistant/toilet` (or water, tired, lost) opens straight on that answer.
 */
export function Assistant({ param }: { param?: string }) {
  const asked = IN_TRIP_MENU.find((r) => r.next === param)?.label ?? (param === "lost" ? "I'm lost" : undefined);
  return <Chat script={IN_TRIP} startAt={param} asked={asked} />;
}
