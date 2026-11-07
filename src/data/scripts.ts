import type { Script } from "./types";

/**
 * Scripted concierge conversations ("Wizard of Oz" prototype — no real AI).
 * Each step: what the assistant says, an optional card, and big reply buttons.
 * Typed or spoken input always follows the FIRST reply, so the demo never gets stuck.
 *
 * Writing rules (see docs/ux-guidelines.md): short sentences, one question at a time,
 * 2–4 replies, plain words, never more than ~3 lines per message.
 */
export const PLAN_TRIP: Script = {
  id: "plan",
  title: "Plan a trip",
  start: "hello",
  steps: {
    hello: {
      say: [
        "Hello Margaret! I'm your travel assistant.",
        "I already know about your knee and your insulin, so I'll plan around them.",
        "Where would you like to go?",
      ],
      replies: [
        { label: "Somewhere warm in Europe", next: "suggest" },
        { label: "I already know where", next: "suggest" },
        { label: "Surprise me", next: "suggest" },
      ],
    },
    suggest: {
      say: ["How about Lisbon in May? It's sunny but not too hot.", "Here's why it suits you:"],
      card: {
        type: "option",
        title: "Lisbon, Portugal · 5 nights",
        badge: "Good match",
        lines: [
          "2.5-hour direct flight from Manchester",
          "Hotel with a lift, fridge in the room, flat street",
          "We'll use taxis and avoid the steep hills",
        ],
      },
      replies: [
        { label: "Sounds lovely", next: "pace" },
        { label: "Show me another place", next: "suggest" },
      ],
    },
    pace: {
      say: ["How busy should each day be?"],
      replies: [
        { label: "One thing a day, with a rest", next: "summary" },
        { label: "Two things a day", next: "summary" },
      ],
    },
    summary: {
      say: ["Great. I've made a first plan. Nothing is booked yet.", "Sarah can see it too, if you like."],
      card: {
        type: "summary",
        title: "Your Lisbon plan",
        lines: [
          "Mon — arrive, rest",
          "Tue — Belém monastery (step-free)",
          "Wed — river cruise, seated",
          "Thu — free day",
          "Fri — fly home",
        ],
      },
      replies: [
        { label: "Share with Sarah", next: "end" },
        { label: "Change something", next: "pace" },
      ],
    },
    end: {
      say: ["Done! Sarah can now see your plan. You can find it under “My trip”."],
    },
  },
};

// TODO(Ronnie): add the in-trip scripts, e.g. "I'm tired", "Where is a toilet?", "I lost my way".
export const SCRIPTS: Record<string, Script> = { [PLAN_TRIP.id]: PLAN_TRIP };
