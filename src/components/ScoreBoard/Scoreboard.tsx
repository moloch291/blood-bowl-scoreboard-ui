import type { TeamMatchState } from "../../types/match";

type ScoreboardProps = {
    home: TeamMatchState;
    away: TeamMatchState;
    half: 1 | 2;
};

export function Scoreboard({
    home,
    away,
    half,
}: ScoreboardProps) {
    return (
        <section className="scoreboard">
            <div className="scoreboard__team scoreboard__team--home">
                <div>
                    <p className="scoreboard__short-name">
                        {home.team.shortName}
                    </p>

                    <h2 className="scoreboard__team-name">
                        {home.team.name}
                    </h2>

                    <p className="scoreboard__details">
                        Turn {home.turn} · {home.rerolls} rerolls
                    </p>
                </div>

                <strong className="scoreboard__score">
                    {home.score}
                </strong>
            </div>

            <div className="scoreboard__center">
                <span className="scoreboard__versus">VS</span>

                <span className="scoreboard__half">
                    {half === 1 ? "First Half" : "Second Half"}
                </span>
            </div>

            <div className="scoreboard__team scoreboard__team--away">
                <strong className="scoreboard__score">
                    {away.score}
                </strong>

                <div>
                    <p className="scoreboard__short-name">
                        {away.team.shortName}
                    </p>

                    <h2 className="scoreboard__team-name">
                        {away.team.name}
                    </h2>

                    <p className="scoreboard__details">
                        Turn {away.turn} · {away.rerolls} rerolls
                    </p>
                </div>
            </div>
        </section>
    );
}