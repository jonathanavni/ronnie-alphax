import { useEffect, type ReactNode } from "react";
import { useRoute, type Page } from "./lib/router";
import { Shell } from "./components/Shell";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Plan } from "./screens/Plan";
import { Trip } from "./screens/Trip";
import { Today } from "./screens/Today";
import { Assistant } from "./screens/Assistant";
import { Translate } from "./screens/Translate";
import { Help } from "./screens/Help";
import { Call } from "./screens/Call";
import { Driver } from "./screens/Driver";
import { Family } from "./screens/Family";
import { SettingsScreen } from "./screens/SettingsScreen";
import { Demo } from "./screens/Demo";

/** Each screen may use `param`: the extra word in the link, e.g. "toilet" in #/assistant/toilet. */
const SCREENS: Record<Page, (props: { param?: string }) => ReactNode> = {
  home: Home,
  profile: Profile,
  plan: Plan,
  trip: Trip,
  today: Today,
  assistant: Assistant,
  translate: Translate,
  help: Help,
  call: Call,
  driver: Driver,
  family: Family,
  settings: SettingsScreen,
  demo: Demo,
};

export default function App() {
  const { page, param } = useRoute();
  const Screen = SCREENS[page];
  // Every screen opens at the top. (Braces matter: newer browsers return a Promise from scrollTo.)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page, param]);
  return (
    <Shell page={page}>
      {/* The key makes a screen start fresh when the link changes (and replays the fade-in). */}
      <div className="screen-body" key={`${page}/${param ?? ""}`}>
        <Screen param={param} />
      </div>
    </Shell>
  );
}
