import { Scoreboard } from "./components/Scoreboard/Scoreboard";
import {
  blackwoodReapers,
  templeSerpents,
} from "./data/teams";

function App() {
  return (
    <main>
      <Scoreboard
        homeTeam={templeSerpents}
        awayTeam={blackwoodReapers}
        homeScore={1}
        awayScore={2}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          padding: "0 1.5rem 3rem",
        }}
      >
        <button className="button">Standard</button>

        <button className="button button--primary">
          Serpents Touchdown
        </button>

        <button className="button button--reapers">
          Reapers Touchdown
        </button>

        <button className="button button--danger">
          Reset Match
        </button>
      </div>
    </main>
  );
}

export default App;