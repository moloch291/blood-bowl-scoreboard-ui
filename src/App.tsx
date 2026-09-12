import { useState } from "react";

import { LeaguePlaceholder } from "./components/LeaguePlaceholder/LeaguePlaceholder";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { MatchLayout } from "./layouts/MatchLayout";

type AppScreen =
  | "menu"
  | "play"
  | "league";

function App() {
  const [screen, setScreen] =
    useState<AppScreen>("menu");

  if (screen === "play") {
    return (
      <MatchLayout
        onBackToMenu={() => setScreen("menu")}
      />
    );
  }

  if (screen === "league") {
    return (
      <LeaguePlaceholder
        onBack={() => setScreen("menu")}
      />
    );
  }

  return (
    <MainMenu
      onPlayGame={() => setScreen("play")}
      onOpenLeague={() => setScreen("league")}
    />
  );
}

export default App;