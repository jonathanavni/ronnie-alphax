import { useEffect, useRef, useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import type { ChatMessage, Script, ScriptCard } from "../data/types";
import { useScript } from "../lib/useScript";
import { navigate } from "../lib/router";
import { ReadAloud } from "./ui";
import { T } from "../data/strings";

/**
 * The concierge chat. Designed for older users:
 * - big reply buttons first (tap, don't type); typing and the mic are optional extras
 * - one short message at a time, calm pace, newest message scrolled into view
 * - every assistant turn can be read aloud
 *
 * `startAt` + `asked` open the chat in the middle, e.g. straight at the "toilet" step
 * with the question already shown (used by the buttons on the Today screen).
 */
export function Chat({ script, startAt, asked }: { script: Script; startAt?: string; asked?: string }) {
  const { messages, replies, typing, start, choose, say } = useScript(script);
  const [draft, setDraft] = useState("");
  const [mic, setMic] = useState<"off" | "listening" | "heard">("off");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // StrictMode runs effects twice in dev
    started.current = true;
    start(startAt, asked);
  }, [start, startAt, asked]);

  // Keep the newest message and the reply buttons in view (scroll the page to the bottom,
  // so nothing hides behind the sticky input bar).
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing, replies.length, mic]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMic("off");
    say(text);
  };

  /**
   * Pretend microphone: shows "Listening…", then fills in a sample sentence the person can
   * change before sending. (No real speech recognition in the prototype.)
   */
  const listen = () => {
    if (mic === "listening") return;
    setMic("listening");
    const sample = replies.find((r) => r.next)?.label ?? "Where is the nearest toilet?";
    window.setTimeout(() => {
      setDraft(sample);
      setMic("heard");
    }, 1800);
  };

  return (
    <div className="chat">
      <h1 className="chat-title">{script.title}</h1>
      <div className="chat-log" aria-live="polite">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {typing && (
          <div className="bubble assistant typing" role="status" aria-label="The assistant is writing">
            <span />
            <span />
            <span />
          </div>
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((r) => (
              <button
                key={r.label}
                type="button"
                className="reply"
                onClick={() => (r.go ? navigate(r.go.page, r.go.param) : choose(r))}
              >
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
        {mic !== "off" && (
          <p className={`mic-status ${mic}`} role="status">
            {mic === "listening" ? T.listening : T.heard}
          </p>
        )}
        <button type="button" className={`composer-btn${mic === "listening" ? " active" : ""}`} onClick={listen}>
          <Mic aria-hidden size={24} />
          {T.speak}
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={T.typeMessage}
          aria-label="Type your message"
          enterKeyHint="send"
        />
        <button type="submit" className="composer-btn primary" disabled={!draft.trim()}>
          <SendHorizontal aria-hidden size={24} />
          {T.send}
        </button>
      </form>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const mine = message.from === "me";
  return (
    <div className={`bubble-row ${mine ? "me" : "assistant"}`}>
      <div className={`bubble ${mine ? "me" : "assistant"}`}>
        <p>{message.text}</p>
        {message.card && <Card card={message.card} />}
        {/* One "Read aloud" per assistant turn (on its last message), reading the whole turn. */}
        {message.speakText && <ReadAloud text={message.speakText} />}
      </div>
    </div>
  );
}

function Card({ card }: { card: ScriptCard }) {
  if (card.type === "phrase") {
    return (
      <div className="chat-card phrase">
        <strong className="phrase-text" lang="pt">
          {card.title}
        </strong>
        {card.lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <ReadAloud text={card.title} lang="pt-PT" label="Say it in Portuguese" />
      </div>
    );
  }
  return (
    <div className={`chat-card ${card.type}`}>
      <div className="chat-card-head">
        <strong>{card.title}</strong>
        {card.type === "option" && card.badge && <span className="badge">{card.badge}</span>}
      </div>
      {card.type === "steps" ? (
        <ol className="steps">
          {card.lines.map((l, i) => (
            <li key={l}>
              <span className="step-num">{i + 1}</span>
              {l}
            </li>
          ))}
        </ol>
      ) : (
        <ul>
          {card.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
