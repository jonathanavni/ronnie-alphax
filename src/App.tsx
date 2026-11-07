import { useEffect, type ReactNode } from "react";
import { useRoute, type Page } from "./lib/router";
import { Shell } from "./components/Shell";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Plan } from "./screens/Plan";
import { Trip } from "./screens/Trip";
import { Today } from "./screens/Today";
import { Help } from "./screens/Help";
import { Family } from "./screens/Family";
import { SettingsScreen } from "./screens/SettingsScreen";
import { Demo } from "./screens/Demo";

const SCREENS: Record<Page, () => ReactNode> = {
  home: Home,
  profile: Profile,
  plan: Plan,
  trip: Trip,
  today: Today,
  help: Help,
  family: Family,
  settings: SettingsScreen,
  demo: Demo,
};

export default function App() {
  const page = useRoute();
  const Screen = SCREENS[page];
  // Every screen opens at the top. (Braces matter: newer browsers return a Promise from scrollTo.)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);
  return (
    <Shell page={page}>
      <Screen />
    </Shell>
  );
}
