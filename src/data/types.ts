/** Shared types for all prototype content. Everything shown in the app is fake sample data. */
import type { Page } from "../lib/router";

export type Traveller = {
  name: string;
  age: number;
  homeCity: string;
  companions: string[];
  /** Short, plain-language needs the concierge personalises around. */
  needs: { icon: NeedIcon; label: string; detail: string }[];
  family: FamilyMember[];
};

export type NeedIcon = "walking" | "medication" | "hearing" | "diet" | "pace" | "sight";

export type FamilyMember = {
  name: string;
  relation: string;
  phone: string;
  canSeeTrip: boolean;
  canSeeLocation: boolean;
};

export type Trip = {
  destination: string;
  country: string;
  dates: string;
  hotel: { name: string; address: string; localAddress: string; phone: string };
  days: TripDay[];
};

export type TripDay = {
  date: string;
  title: string;
  items: TripItem[];
};

export type TripItem = {
  time: string;
  title: string;
  kind: "travel" | "activity" | "meal" | "rest" | "medication";
  /** Why this suits *this* traveller, e.g. "Step-free entrance, lift to every floor". */
  accessNote?: string;
  /** Step-by-step "how do I get there" instructions for the in-trip assistant. */
  directions?: string[];
};

/** A scripted concierge conversation. The prototype is "Wizard of Oz": no real AI, just a script. */
export type Script = {
  id: string;
  title: string;
  start: string;
  steps: Record<string, ScriptStep>;
  /** Typed or spoken text that contains one of the keywords jumps to that step ("bathroom" → toilet). */
  topics?: { keywords: string[]; next: string }[];
  /** Step to play when typed text matches no topic: "Sorry, did you mean…?" */
  fallback?: string;
};

export type ScriptStep = {
  /** One or more assistant messages, shown one after another. Keep each short. */
  say: string[];
  /** Optional rich card shown under the messages. */
  card?: ScriptCard;
  /** Big tappable answers. The first one is where typed / spoken input goes too. */
  replies?: ScriptReply[];
};

/** A reply button. It either continues the chat (`next`) or opens another screen (`go`). */
export type ScriptReply = {
  label: string;
  next?: string;
  go?: { page: Page; param?: string };
};

export type ScriptCard =
  | { type: "option"; title: string; lines: string[]; badge?: string }
  | { type: "summary"; title: string; lines: string[] }
  /** Numbered walking directions. */
  | { type: "steps"; title: string; lines: string[] }
  /** A phrase in the local language to show or say to someone. `title` is the phrase. */
  | { type: "phrase"; title: string; lines: string[] };

export type ChatMessage = {
  id: number;
  from: "assistant" | "me";
  text: string;
  card?: ScriptCard;
  /** Set on the last message of each assistant turn: the whole turn, for "Read aloud". */
  speakText?: string;
};
