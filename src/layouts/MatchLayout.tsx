import { useReducer } from "react";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { Scoreboard } from "../components/ScoreBoard/Scoreboard";
import {
    blackwoodReapers,
    templeSerpents,
} from "../data/teams";
import { matchReducer } from "../reducers/matchReducer";
import type { MatchState } from "../types/match";

const initialMatch: MatchState = {
    home: {
        team: templeSerpents,
        score: 0,
        turn: 0,
        rerolls: 3,
    },

    away: {
        team: blackwoodReapers,
        score: 0,
        turn: 0,
        rerolls: 3,
    },

    half: 1,
};

export function MatchLayout() {
    const [match, dispatch] = useReducer(
        matchReducer,
        initialMatch,
    );

    return (
        <main className="match-layout">
            <Scoreboard
                home={match.home}
                away={match.away}
                half={match.half}
            />

            <ControlPanel
                match={match}
                dispatch={dispatch}
                initialMatch={initialMatch}
            />
        </main>
    );
}