import { Chat } from "../components/Chat";
import { PLAN_TRIP } from "../data/scripts";

/** Flow 1 — plan a trip by chatting with the concierge (scripted). */
export function Plan() {
  return <Chat script={PLAN_TRIP} />;
}
