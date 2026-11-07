import { ScreenTitle } from "../components/ui";
import { setTextSize, TEXT_SIZES, useTextSize } from "../lib/settings";

export function SettingsScreen() {
  const size = useTextSize();
  return (
    <>
      <ScreenTitle title="Text size" intro="Choose the size that is most comfortable to read." />
      <div className="segmented" role="radiogroup" aria-label="Text size">
        {TEXT_SIZES.map((s) => (
          <button
            key={s.value}
            type="button"
            role="radio"
            aria-checked={size === s.value}
            className={size === s.value ? "active" : ""}
            onClick={() => setTextSize(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="preview-text">This is how text will look. You can change it at any time.</p>
    </>
  );
}
