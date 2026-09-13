import type {
    ConferenceTeam,
} from "../../types/league";

interface ConferenceTableProps {
    title: string;
    logo: string;
    teams: ConferenceTeam[];
    onAddResult: () => void;
}

export function ConferenceTable({
    title,
    logo,
    teams,
    onAddResult,
}: ConferenceTableProps) {
    return (
        <section className="conference-table">
            <div className="conference-table__branding">
                <img
                    className="conference-table__logo"
                    src={logo}
                    alt=""
                    aria-hidden="true"
                />

                <h2 className="conference-table__title">
                    {title}
                </h2>
            </div>

            <div className="conference-table__shell">
                <table className="conference-table__table">
                    <thead>
                        <tr>
                            <th
                                className="conference-table__team-heading"
                                scope="col"
                            >
                                <span className="visually-hidden">
                                    Team
                                </span>
                            </th>

                            <th scope="col">
                                PTS
                            </th>

                            <th scope="col">
                                TD
                            </th>

                            <th scope="col">
                                CAS
                            </th>

                            <th scope="col">
                                GP
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.team_name}>
                                <th
                                    className="conference-table__team"
                                    scope="row"
                                >
                                    <img
                                        className="conference-table__wordmark"
                                        src={team.team_logo}
                                        alt={team.team_name}
                                    />
                                </th>

                                <td>
                                    {team.points}
                                </td>

                                <td>
                                    {team.touchdowns}
                                </td>

                                <td>
                                    {team.casualties}
                                </td>

                                <td>
                                    {team.games_played}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                type="button"
                className="button button--primary conference-table__add-result"
                onClick={onAddResult}
            >
                Add Game Result
            </button>
        </section>
    );
}