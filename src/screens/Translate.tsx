import { useEffect, useState } from "react";
import { Camera, Info, MessageCircle, RotateCcw, ScrollText, Signpost } from "lucide-react";
import { ActionCard, ReadAloud, ScreenTitle } from "../components/ui";
import { navigate } from "../lib/router";
import { TRANSLATE_SAMPLES, type TranslateSample } from "../data/translate";
import { TRAVELLER } from "../data/sample";

/**
 * Mock-up of "take a photo of a sign or menu and read it in English".
 * Three steps: choose what it is → the camera → the translation.
 * Nothing is real: the "photo" is drawn from src/data/translate.ts and the camera is never used.
 * `#/translate/sign` and `#/translate/menu` open straight on the camera.
 */
const ICONS = { sign: Signpost, menu: ScrollText };

export function Translate({ param }: { param?: string }) {
  const fromLink = TRANSLATE_SAMPLES.find((s) => s.id === param);
  const [sample, setSample] = useState<TranslateSample | undefined>(fromLink);
  const [stage, setStage] = useState<"camera" | "working" | "result">("camera");

  // Pretend to "read" the photo for a moment, so it feels like something is happening.
  useEffect(() => {
    if (stage !== "working") return;
    const t = window.setTimeout(() => setStage("result"), 1800);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Each step starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [sample, stage]);

  const startOver = () => {
    setSample(undefined);
    setStage("camera");
  };

  if (!sample) {
    return (
      <>
        <ScreenTitle
          title="Translate"
          intro="Take a photo of something written in Portuguese. I'll tell you what it says in English."
        />
        <h2>What would you like to read?</h2>
        <div className="stack">
          {TRANSLATE_SAMPLES.map((s) => (
            <ActionCard key={s.id} icon={ICONS[s.id]} title={s.label} text={s.hint} onClick={() => setSample(s)} />
          ))}
        </div>
      </>
    );
  }

  if (stage !== "result") {
    const working = stage === "working";
    return (
      <>
        <ScreenTitle
          title={working ? "Reading the words…" : "Take a photo"}
          intro={working ? "This takes a few seconds." : "Hold the phone so you can see all the words, then press the button."}
        />
        <div className={`viewfinder${working ? " working" : ""}`} role="img" aria-label={`Camera view showing ${sample.label.toLowerCase()} in Portuguese`}>
          <SamplePhoto sample={sample} />
        </div>
        <p className="muted small-note">Sample photo. The prototype does not use your camera.</p>
        {working ? (
          <p className="status-line" role="status">
            Translating into English…
          </p>
        ) : (
          <div className="stack">
            <button type="button" className="btn primary" onClick={() => setStage("working")}>
              <Camera aria-hidden size={26} />
              Take photo
            </button>
            <button type="button" className="btn" onClick={startOver}>
              Cancel
            </button>
          </div>
        )}
      </>
    );
  }

  const spoken = [...sample.lines.map((l) => l.english + "."), sample.advice].join(" ");
  return (
    <>
      <ScreenTitle title="Here is what it says" intro="Translated from Portuguese into English." />
      <ul className="translation">
        {sample.lines.map((l) => (
          <li key={l.original}>
            <span className="translation-text">
              <strong>{l.english}</strong>
              <span className="muted" lang="pt">
                {l.original}
              </span>
            </span>
            {l.price && <span className="price">{l.price}</span>}
          </li>
        ))}
      </ul>
      <aside className="advice">
        <Info aria-hidden size={26} />
        <div>
          <strong>Good to know, {TRAVELLER.name}</strong>
          <p>{sample.advice}</p>
        </div>
      </aside>
      <div className="stack">
        <ReadAloud text={spoken} className="btn" />
        <button type="button" className="btn primary" onClick={startOver}>
          <RotateCcw aria-hidden size={24} />
          Translate something else
        </button>
        <button type="button" className="btn" onClick={() => navigate("assistant")}>
          <MessageCircle aria-hidden size={24} />
          Ask your assistant
        </button>
      </div>
    </>
  );
}

/** The pretend photo: a sign or a menu, drawn with plain HTML and CSS. */
function SamplePhoto({ sample }: { sample: TranslateSample }) {
  return (
    <div className={`photo-paper ${sample.id}`} lang="pt">
      {sample.lines.map((l, i) => (
        <p key={l.original} className={i === 0 ? "photo-head" : undefined}>
          <span>{l.original}</span>
          {l.price && <span>{l.price}</span>}
        </p>
      ))}
    </div>
  );
}
