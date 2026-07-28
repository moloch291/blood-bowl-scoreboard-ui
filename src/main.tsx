import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { installButtonClickEffects } from "./utils/installButtonClickEffects";

import "./index.css";

installButtonClickEffects();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Unable to start the application: element "#root" was not found.',
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);