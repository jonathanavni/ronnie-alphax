import { useEffect, useState, type ReactNode } from "react";
import { ChevronRight, Square, Volume2, type LucideIcon } from "lucide-react";
import { canSpeak, speak, stopSpeaking } from "../lib/speech";
import { T } from "../data/strings";

/** Small shared building blocks. Add here only when a second screen needs the same thing. */

export function ScreenTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="screen-title">
      <h1>{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}

/**
 * A big card with an icon, a title and one line of description.
 * With `onClick` the whole card is a button (and shows an arrow). Without it, it is just information.
 */
export function ActionCard({
  icon: Icon,
  title,
  text,
  onClick,
  tone = "default",
}: {
  icon: LucideIcon;
  title: string;
  text?: string;
  onClick?: () => void;
  tone?: "default" | "primary" | "warm";
}) {
  const body = (
    <>
      <span className="action-icon">
        <Icon aria-hidden size={30} />
      </span>
      <span className="action-text">
        <strong>{title}</strong>
        {text && <span>{text}</span>}
      </span>
    </>
  );
  if (!onClick) return <div className={`action-card static ${tone}`}>{body}</div>;
  return (
    <button type="button" className={`action-card ${tone}`} onClick={onClick}>
      {body}
      <ChevronRight aria-hidden size={26} className="action-chevron" />
    </button>
  );
}

/** "Read aloud" button: reads `text` with the phone's voice. Press again to stop. */
export function ReadAloud({
  text,
  lang,
  label = T.readAloud,
  className = "read-aloud",
}: {
  text: string;
  lang?: string;
  label?: string;
  className?: string;
}) {
  const [reading, setReading] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!canSpeak) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (reading) {
          stopSpeaking();
          setReading(false);
        } else {
          setReading(true);
          speak(text, () => setReading(false), lang);
        }
      }}
    >
      {reading ? <Square aria-hidden size={20} /> : <Volume2 aria-hidden size={22} />}
      {reading ? T.stopReading : label}
    </button>
  );
}

/**
 * Marks what a screen still needs. Hidden while the prototype is shown to testers:
 * set SHOW_TODO to true to see the boxes again while building.
 */
const SHOW_TODO = false;

export function Todo({ items }: { items: string[] }) {
  if (!SHOW_TODO) return null;
  return (
    <aside className="todo">
      <strong>To build (see PLAN.md)</strong>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </aside>
  );
}
