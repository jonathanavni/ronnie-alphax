import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "./styles.css";
import "./lib/settings"; // applies the saved text size before first paint
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
