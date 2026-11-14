import { Check } from "lucide-react";
import { ScreenTitle } from "../components/ui";
import { setTextSize, TEXT_SIZES, useTextSize } from "../lib/settings";

export function SettingsScreen() {
  const size = useTextSize();
  return (
    <>
      <ScreenTitle title="Text size" intro="Choose the size that is most comfortable to read." />
      <div className="stack" role="radiogroup" aria-label="Text size">
        {TEXT_SIZES.map((s) => {
          const selected = size === s.value;
          return (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`size-option${selected ? " active" : ""}`}
              onClick={() => setTextSize(s.value)}
            >
              {/* The sample letter is shown at the real size of each choice. */}
              <span className="size-sample" style={{ fontSize: s.px }} aria-hidden>
                Aa
              </span>
              <strong>{s.label}</strong>
              {selected && (
                <span className="size-selected">
                  <Check aria-hidden size={22} /> Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="preview-text">This is how text will look. You can change it at any time.</p>
    </>
  );
}
