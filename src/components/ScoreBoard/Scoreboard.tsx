import type { CSSProperties } from "react";

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

interface ScoreboardIndicatorStyles extends CSSProperties {
    "--active-team-accent": string;
}

export function Scoreboard({
    home,
    away,
    half,
    activeSide,
}: ScoreboardProps) {
    const activeTeam =
        activeSide === "home"
            ? home.team
            : activeSide === "away"
                ? away.team
                : null;

    const indicatorStyles: ScoreboardIndicatorStyles = {
        "--active-team-accent":
            activeTeam?.colors.accent ?? "transparent",
    };

    return (
        <div
            className={[
                "scoreboard-shell",
                activeSide
                    ? `scoreboard-shell--active-${activeSide}`
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={indicatorStyles}
        >
            <span
                className="scoreboard__active-indicator"
                aria-hidden="true"
            />

            <div className="scoreboard">
                <TeamPanel
                    team={home}
                    side="home"
                />

                <div className="scoreboard__center">
                    <div className="scoreboard__versus">
                        VS
                    </div>

                    <div className="scoreboard__half">
                        Half {half}
                    </div>
                </div>

                <TeamPanel
                    team={away}
                    side="away"
                />
            </div>
        </div>
    );
}