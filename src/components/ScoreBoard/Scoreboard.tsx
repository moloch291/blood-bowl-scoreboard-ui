import type { Team } from "../../types/team";

type ScoreboardProps = {
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number;
    awayScore: number;
};

export function Scoreboard({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
}: ScoreboardProps) {
    return (
        <section className="scoreboard">
            <div className="scoreboard__team scoreboard__team--home">
                <div>
                    <p className="scoreboard__short-name">
                        {homeTeam.shortName}
                    </p>

                    <h2 className="scoreboard__team-name">
                        {homeTeam.name}
                    </h2>
                </div>

                <strong className="scoreboard__score">
                    {homeScore}
                </strong>
            </div>

            <div className="scoreboard__center">
                <span className="scoreboard__versus">VS</span>
                <span className="scoreboard__half">First Half</span>
            </div>

            <div className="scoreboard__team scoreboard__team--away">
                <strong className="scoreboard__score">
                    {awayScore}
                </strong>

                <div>
                    <p className="scoreboard__short-name">
                        {awayTeam.shortName}
                    </p>

                    <h2 className="scoreboard__team-name">
                        {awayTeam.name}
                    </h2>
                </div>
            </div>
        </section>
    );
}