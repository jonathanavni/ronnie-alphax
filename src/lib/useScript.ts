import { useCallback, useRef, useState } from "react";
import type { ChatMessage, Script } from "../data/types";

/**
 * Plays a scripted conversation. Assistant messages appear one by one with a short
 * "typing" pause so the pace feels calm and readable, not like a wall of text.
 */
const PAUSE_MS = 700;

export function useScript(script: Script) {
  const nextId = useRef(1);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stepId, setStepId] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const push = (m: Omit<ChatMessage, "id">) =>
    setMessages((prev) => [...prev, { ...m, id: nextId.current++ }]);

  const playStep = useCallback(
    async (id: string) => {
      const step = script.steps[id];
      if (!step) return;
      setStepId(null); // hide replies while the assistant "talks"
      setTyping(true);
      for (const [i, text] of step.say.entries()) {
        await wait(PAUSE_MS);
        const isLast = i === step.say.length - 1;
        push({
          from: "assistant",
          text,
          card: isLast ? step.card : undefined,
          speakText: isLast ? step.say.join(" ") : undefined,
        });
      }
      setTyping(false);
      setStepId(id);
    },
    [script],
  );

  const start = useCallback(() => {
    setMessages([]);
    void playStep(script.start);
  }, [playStep, script.start]);

  /** User tapped a reply, or typed/spoke something (which follows the first reply). */
  const answer = (text: string, next?: string) => {
    const step = stepId ? script.steps[stepId] : undefined;
    const target = next ?? step?.replies?.[0]?.next;
    push({ from: "me", text });
    if (target) void playStep(target);
    else setStepId(null);
  };

  const replies = stepId ? (script.steps[stepId]?.replies ?? []) : [];
  return { messages, replies, typing, start, answer };
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
