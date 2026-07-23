import type { TeamMatchState } from "../../types/match";

interface TeamPanelProps {
    team: TeamMatchState;
    side: "home" | "away";
}

export function TeamPanel({
    team,
    side,
}: TeamPanelProps) {
    return (
        <section
            className={`scoreboard__team scoreboard__team--${side}`}
        >
            <div className="scoreboard__team-info">
                <div className="scoreboard__team-name">
                    {team.team.shortName}
                </div>

                <div className="scoreboard__details">
                    <span>Turn {team.turn}</span>
                    <span>Rerolls {team.rerolls}</span>
                </div>
            </div>

            <div className="scoreboard__score">
                {team.score}
            </div>
        </section>
    );
}