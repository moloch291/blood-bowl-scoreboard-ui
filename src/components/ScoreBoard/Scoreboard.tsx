import { TeamPanel } from "../TeamPanel/TeamPanel";
import type { TeamMatchState } from "../../types/match";

interface ScoreboardProps {
    home: TeamMatchState;
    away: TeamMatchState;
    half: 1 | 2;
}

export function Scoreboard({
    home,
    away,
    half,
}: ScoreboardProps) {
    return (
        <div className="scoreboard">
            <TeamPanel
                team={home}
                side="home"
            />

            <div className="scoreboard__center">
                <div className="scoreboard__versus">VS</div>

                <div className="scoreboard__half">
                    Half {half}
                </div>
            </div>

            <TeamPanel
                team={away}
                side="away"
            />
        </div>
    );
}