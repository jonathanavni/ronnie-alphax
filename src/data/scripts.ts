import type { Script, ScriptReply } from "./types";

/**
 * Scripted concierge conversations ("Wizard of Oz" prototype — no real AI).
 * Each step: what the assistant says, an optional card, and big reply buttons.
 *
 * A reply either continues the chat (`next: "stepName"`) or opens a screen (`go: { page: … }`).
 * Typed or spoken input: see `say()` in src/lib/useScript.ts — it looks for a topic keyword first,
 * so the demo never gets stuck.
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
        title: "Lisbon, Portugal · 4 nights",
        badge: "Good match",
        lines: [
          "2.5-hour direct flight from Manchester",
          "Hotel with a lift, fridge in the room, flat street",
          "We'll use taxis and avoid the steep hills",
        ],
      },
      replies: [
        { label: "Sounds lovely", next: "pace" },
        { label: "Show me another place", next: "another" },
      ],
    },
    another: {
      say: ["Of course. How about Seville in April? It is flat and easy to walk."],
      card: {
        type: "option",
        title: "Seville, Spain · 4 nights",
        badge: "Also a good match",
        lines: [
          "3-hour direct flight from Manchester",
          "Flat old town, many shaded benches",
          "Warm in April, about 24°C",
        ],
      },
      replies: [
        { label: "I prefer Lisbon", next: "pace" },
        { label: "Show me Lisbon again", next: "suggest" },
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
      say: ["I've made a first plan. Nothing is booked yet.", "Sarah can see it too, if you like."],
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
      say: ["Done. Sarah can now see your plan.", "You can find it under “My trip”."],
      replies: [
        { label: "Open My trip", go: { page: "trip" } },
        { label: "Start again", next: "hello" },
      ],
    },
  },
};

/** The four things people ask most often during a day out. Also used as buttons on the Today screen. */
export const IN_TRIP_MENU: ScriptReply[] = [
  { label: "Where is the nearest toilet?", next: "toilet" },
  { label: "Where can I get a drink of water?", next: "water" },
  { label: "I'm tired and need to sit down", next: "tired" },
  { label: "Something else", next: "more" },
];

const AFTER_HELP: ScriptReply[] = [
  { label: "Thank you, that's all", next: "done" },
  { label: "I need something else", next: "again" },
];

/**
 * Help during the trip. The story: it is Tuesday morning and Margaret is at
 * Jerónimos Monastery in Belém (see src/data/sample.ts).
 */
export const IN_TRIP: Script = {
  id: "assistant",
  title: "Your travel assistant",
  start: "menu",
  fallback: "sorry",
  topics: [
    { keywords: ["toilet", "bathroom", "restroom", "loo", "lavatory", "wc", "ladies"], next: "toilet" },
    { keywords: ["water", "drink", "thirsty", "fountain"], next: "water" },
    { keywords: ["tired", "sit", "seat", "bench", "rest", "exhausted"], next: "tired" },
    { keywords: ["lost", "where am i"], next: "lost" },
    { keywords: ["translate", "translation", "sign", "menu", "portuguese", "language"], next: "translate" },
    { keywords: ["hotel", "taxi"], next: "hotel" },
  ],
  steps: {
    menu: {
      say: ["Hello Margaret. I can see you're at Jerónimos Monastery.", "What do you need?"],
      replies: IN_TRIP_MENU,
    },
    again: {
      say: ["Of course. What do you need?"],
      replies: IN_TRIP_MENU,
    },
    sorry: {
      say: ["Sorry, I didn't quite get that.", "Did you mean one of these?"],
      replies: IN_TRIP_MENU,
    },
    more: {
      say: ["Here are some other things I can do."],
      replies: [
        { label: "Translate a sign or menu", go: { page: "translate" } },
        { label: "I'm lost", next: "lost" },
        { label: "Talk to a real person", go: { page: "call", param: "support" } },
      ],
    },

    // ── Toilet ──
    toilet: {
      say: ["The nearest toilet is 2 minutes away, inside the monastery.", "There are no steps on the way."],
      card: {
        type: "option",
        title: "Toilets by the ticket desk",
        badge: "2 minutes' walk",
        lines: ["Step-free, wide door, grab rails", "Free with your ticket", "Open now, until 18:00"],
      },
      replies: [
        { label: "Show me the way", next: "toiletWay" },
        { label: "Is there another one?", next: "toiletOther" },
        { label: "Thank you, that's all", next: "done" },
      ],
    },
    toiletWay: {
      say: ["Here is the way. It is flat all the way."],
      card: {
        type: "steps",
        title: "To the toilets",
        lines: [
          "Go in through the main entrance.",
          "Turn left at the ticket desk.",
          "It is the second door on your right. Look for the blue “WC” sign.",
        ],
      },
      replies: [
        { label: "I found it, thank you", next: "done" },
        { label: "I can't find it", next: "toiletAsk" },
      ],
    },
    toiletAsk: {
      say: ["No problem. Show this to any member of staff:"],
      card: {
        type: "phrase",
        title: "Onde fica a casa de banho, por favor?",
        lines: ["It means: “Where is the toilet, please?”"],
      },
      replies: [
        { label: "Thank you, that helped", next: "done" },
        { label: "Call Sarah", go: { page: "call", param: "sarah" } },
      ],
    },
    toiletOther: {
      say: [
        "There is one more, in the café across the garden. It is 5 minutes away.",
        "It has two steps at the door, so I suggest the first one.",
      ],
      replies: [{ label: "Show me the way to the first one", next: "toiletWay" }, ...AFTER_HELP],
    },

    // ── Water ──
    water: {
      say: ["There is a free drinking fountain 1 minute away, in the garden.", "The tap water in Lisbon is safe to drink."],
      card: {
        type: "option",
        title: "Drinking fountain in the garden",
        badge: "1 minute's walk",
        lines: ["Flat path, with a bench next to it", "Free", "Or buy a bottle at the café by the exit: €1.50"],
      },
      replies: [
        { label: "Show me the way", next: "waterWay" },
        { label: "I'd rather buy a bottle", next: "waterCafe" },
        { label: "Thank you, that's all", next: "done" },
      ],
    },
    waterWay: {
      say: ["Here is the way to the fountain."],
      card: {
        type: "steps",
        title: "To the drinking fountain",
        lines: [
          "Leave by the main entrance.",
          "Turn right and follow the flat path into the garden.",
          "The fountain is next to the first bench, on your left.",
        ],
      },
      replies: AFTER_HELP,
    },
    waterCafe: {
      say: ["The café is by the exit, 3 minutes away. It has seats inside.", "To ask for water, show or say this:"],
      card: {
        type: "phrase",
        title: "Uma água sem gás, por favor.",
        lines: ["It means: “A still water, please.”"],
      },
      replies: AFTER_HELP,
    },

    // ── Tired ──
    tired: {
      say: [
        "Let's find you a seat. There is a bench in the shade, 1 minute away.",
        "Your lunch table is booked for 12:30, so there is no rush.",
      ],
      replies: [
        { label: "Show me the way to the bench", next: "benchWay" },
        { label: "I'd like to go back to the hotel", next: "hotel" },
        { label: "I'm fine now, thank you", next: "done" },
      ],
    },
    benchWay: {
      say: ["Here is the way. Take your time."],
      card: {
        type: "steps",
        title: "To the bench in the cloister",
        lines: [
          "Walk straight ahead, into the cloister.",
          "The benches are along the wall on your right, in the shade.",
        ],
      },
      replies: AFTER_HELP,
    },
    hotel: {
      say: [
        "Of course. I can ask your taxi to come now. It takes about 10 minutes.",
        "I would move your lunch to another day. Nothing changes until you say yes.",
      ],
      replies: [
        { label: "Yes, call the taxi", next: "taxi" },
        { label: "No, I'll rest here first", next: "done" },
      ],
    },
    taxi: {
      say: [
        "Done. Your taxi is on its way: a blue car, plate AB-12-CD.",
        "It will stop at the side entrance, where there are no steps.",
        "I've told Sarah you are heading back.",
      ],
      replies: [
        { label: "Show the hotel address for the driver", go: { page: "driver" } },
        { label: "Thank you, that's all", next: "done" },
      ],
    },

    // ── Lost ──
    lost: {
      say: [
        "Don't worry. I can see where you are: in the monastery garden.",
        "The main entrance is 4 minutes away. What would you like to do?",
      ],
      replies: [
        { label: "Take me back to the entrance", next: "lostWay" },
        { label: "Call Sarah", go: { page: "call", param: "sarah" } },
        { label: "Take me to my hotel", go: { page: "driver" } },
      ],
    },
    lostWay: {
      say: ["Here is the way back. It is flat, with benches on the way."],
      card: {
        type: "steps",
        title: "Back to the main entrance",
        lines: [
          "Turn so the river is behind you.",
          "Follow the wide path towards the big white building.",
          "The main entrance is the large door with the flags.",
        ],
      },
      replies: AFTER_HELP,
    },

    // ── Translate (reached by typing, e.g. "can you translate this menu?") ──
    translate: {
      say: ["Yes. Take a photo of a sign or a menu, and I'll tell you what it says in English."],
      replies: [
        { label: "Open the translator", go: { page: "translate" } },
        { label: "I need something else", next: "again" },
      ],
    },

    done: {
      say: ["You're welcome. I'm here whenever you need me."],
      replies: [
        { label: "I need something else", next: "again" },
        { label: "Back to my day", go: { page: "today" } },
      ],
    },
  },
};

export const SCRIPTS: Record<string, Script> = { [PLAN_TRIP.id]: PLAN_TRIP, [IN_TRIP.id]: IN_TRIP };
