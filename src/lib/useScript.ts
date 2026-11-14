import { useCallback, useRef, useState } from "react";
import type { ChatMessage, Script, ScriptReply } from "../data/types";

/**
 * Plays a scripted conversation. Assistant messages appear one by one with a short
 * "typing" pause so the pace feels calm and readable, not like a wall of text.
 */
const PAUSE_MS = 700;

export function useScript(script: Script) {
  const nextId = useRef(1);
  const run = useRef(0); // goes up each time a step starts, so an older step stops talking
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stepId, setStepId] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const push = (m: Omit<ChatMessage, "id">) =>
    setMessages((prev) => [...prev, { ...m, id: nextId.current++ }]);

  const playStep = useCallback(
    async (id: string) => {
      const step = script.steps[id];
      if (!step) return;
      const myRun = ++run.current;
      setStepId(null); // hide replies while the assistant "talks"
      setTyping(true);
      for (const [i, text] of step.say.entries()) {
        await wait(PAUSE_MS);
        if (run.current !== myRun) return;
        const isLast = i === step.say.length - 1;
        push({
          from: "assistant",
          text,
          card: isLast ? step.card : undefined,
          speakText: isLast ? speakable(step.say, step.card) : undefined,
        });
      }
      setTyping(false);
      setStepId(id);
    },
    [script],
  );

  /** Start (or restart). `at` jumps straight to a step; `asked` shows the question that led there. */
  const start = useCallback(
    (at?: string, asked?: string) => {
      nextId.current = 1;
      setMessages(asked ? [{ id: nextId.current++, from: "me", text: asked }] : []);
      void playStep(at && script.steps[at] ? at : script.start);
    },
    [playStep, script],
  );

  /** The user tapped a reply button. */
  const choose = (reply: ScriptReply) => {
    push({ from: "me", text: reply.label });
    if (reply.next) void playStep(reply.next);
  };

  /**
   * The user typed or spoke something. In order:
   * 1. a topic keyword ("bathroom" → the toilet step),
   * 2. the script's "sorry, did you mean…" step, if it has one,
   * 3. otherwise the first reply — so the demo never gets stuck.
   */
  const say = (text: string) => {
    const topic = script.topics?.find((t) => t.keywords.some((k) => new RegExp(`\\b${k}s?\\b`, "i").test(text)));
    const step = stepId ? script.steps[stepId] : undefined;
    const target = topic?.next ?? script.fallback ?? step?.replies?.find((r) => r.next)?.next;
    push({ from: "me", text });
    if (target) void playStep(target);
  };

  const replies = stepId ? (script.steps[stepId]?.replies ?? []) : [];
  return { messages, replies, typing, start, choose, say };
}

/** What "Read aloud" says for one assistant turn: the messages, plus the card under them. */
function speakable(say: string[], card?: ChatMessage["card"]) {
  if (!card || card.type === "phrase") return say.join(" ");
  return [...say, card.title + ".", ...card.lines.map((l) => l + ".")].join(" ");
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
