import { TeamPanel } from "../TeamPanel/TeamPanel";
import type {
    TeamMatchState,
    TeamSide,
} from "../../types/match";

interface ScoreboardProps {
    home: TeamMatchState;
    away: TeamMatchState;
    half: 1 | 2;
    activeSide: TeamSide | null;
}

export function Scoreboard({
    home,
    away,
    half,
    activeSide,
}: ScoreboardProps) {
    return (
        <div className="scoreboard">
            <TeamPanel
                team={home}
                side="home"
                isActive={activeSide === "home"}
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
                isActive={activeSide === "away"}
            />
        </div>
    );
}