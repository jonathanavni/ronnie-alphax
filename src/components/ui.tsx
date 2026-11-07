import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/** Small shared building blocks. Add here only when a second screen needs the same thing. */

export function ScreenTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="screen-title">
      <h1>{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}

/** A big, fully tappable card with an icon, a title and one line of description. */
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
  onClick: () => void;
  tone?: "default" | "primary" | "warm";
}) {
  return (
    <button type="button" className={`action-card ${tone}`} onClick={onClick}>
      <span className="action-icon">
        <Icon aria-hidden size={30} />
      </span>
      <span className="action-text">
        <strong>{title}</strong>
        {text && <span>{text}</span>}
      </span>
    </button>
  );
}

/** Marks what a screen still needs. Remove once the screen is built. */
export function Todo({ items }: { items: string[] }) {
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
