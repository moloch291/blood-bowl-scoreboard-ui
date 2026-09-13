import { useState } from "react";

import { League } from "./components/League/League";
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
      <League
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