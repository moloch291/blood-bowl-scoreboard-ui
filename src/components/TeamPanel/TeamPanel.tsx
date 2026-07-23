import type { CSSProperties } from "react";
import type { TeamMatchState } from "../../types/match";

interface TeamPanelProps {
    team: TeamMatchState;
    side: "home" | "away";
}

interface TeamPanelStyles extends CSSProperties {
    "--team-primary": string;
    "--team-secondary": string;
    "--team-accent": string;
    "--team-text": string;
}

export function TeamPanel({
    team,
    side,
}: TeamPanelProps) {
    const teamStyles: TeamPanelStyles = {
        "--team-primary": team.team.colors.primary,
        "--team-secondary": team.team.colors.secondary,
        "--team-accent": team.team.colors.accent,
        "--team-text": team.team.colors.text,
    };

    return (
        <section
            className={`scoreboard__team scoreboard__team--${side}`}
            style={teamStyles}
        >
            <div className="scoreboard__branding">
                <img
                    className="scoreboard__team-icon"
                    src={team.team.assets.icon}
                    alt=""
                    aria-hidden="true"
                />

                <div className="scoreboard__team-info">
                    <div className="scoreboard__team-name">
                        {team.team.shortName}
                    </div>

                    <div className="scoreboard__details">
                        <span>Turn {team.turn}</span>
                        <span>Rerolls {team.rerolls}</span>
                    </div>
                </div>
            </div>

            <div
                className="scoreboard__score"
                aria-label={`${team.team.name} score ${team.score}`}
            >
                {team.score}
            </div>
        </section>
    );
}