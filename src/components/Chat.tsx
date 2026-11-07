import { useEffect, useRef, useState } from "react";
import { Mic, SendHorizontal, Volume2, Square } from "lucide-react";
import type { ChatMessage, Script, ScriptCard } from "../data/types";
import { useScript } from "../lib/useScript";
import { canSpeak, speak, stopSpeaking } from "../lib/speech";
import { T } from "../data/strings";

/**
 * The concierge chat. Designed for older users:
 * - big reply buttons first (tap, don't type); typing and the mic are optional extras
 * - one short message at a time, calm pace, newest message scrolled into view
 * - every assistant message can be read aloud
 */
export function Chat({ script }: { script: Script }) {
  const { messages, replies, typing, start, answer } = useScript(script);
  const [draft, setDraft] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // StrictMode runs effects twice in dev
    started.current = true;
    start();
    return () => stopSpeaking();
  }, [start]);

  // Keep the newest message and the reply buttons in view (scroll the page to the bottom,
  // so nothing hides behind the sticky input bar).
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing, replies.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    answer(text);
  };

  return (
    <div className="chat">
      <div className="chat-log" aria-live="polite">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {typing && (
          <div className="bubble assistant typing" aria-label="The assistant is writing">
            <span />
            <span />
            <span />
          </div>
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((r) => (
              <button key={r.label} type="button" className="reply" onClick={() => answer(r.label, r.next)}>
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {/* TODO(Ronnie): the mic is visual only for now — decide whether to fake "listening" in demos. */}
        <button type="button" className="icon-btn" aria-label={T.speak}>
          <Mic aria-hidden size={26} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={T.typeMessage}
          aria-label={T.typeMessage}
        />
        <button type="submit" className="icon-btn primary" aria-label={T.send} disabled={!draft.trim()}>
          <SendHorizontal aria-hidden size={26} />
        </button>
      </form>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const [reading, setReading] = useState(false);
  const mine = message.from === "me";
  return (
    <div className={`bubble-row ${mine ? "me" : "assistant"}`}>
      <div className={`bubble ${mine ? "me" : "assistant"}`}>
        <p>{message.text}</p>
        {message.card && <Card card={message.card} />}
        {/* One "Read aloud" per assistant turn (on its last message), reading the whole turn. */}
        {message.speakText && canSpeak && (
          <button
            type="button"
            className="read-aloud"
            onClick={() => {
              if (reading) {
                stopSpeaking();
                setReading(false);
              } else {
                setReading(true);
                speak(message.speakText!, () => setReading(false));
              }
            }}
          >
            {reading ? <Square aria-hidden size={18} /> : <Volume2 aria-hidden size={20} />}
            {reading ? T.stopReading : T.readAloud}
          </button>
        )}
      </div>
    </div>
  );
}

function Card({ card }: { card: ScriptCard }) {
  return (
    <div className={`chat-card ${card.type}`}>
      <div className="chat-card-head">
        <strong>{card.title}</strong>
        {card.type === "option" && card.badge && <span className="badge">{card.badge}</span>}
      </div>
      <ul>
        {card.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
