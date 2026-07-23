import { useState } from "react";
import type { CSSProperties } from "react";
import type { Team } from "../../types/team";

import "./match-setup.css";

export interface MatchSetupSelection {
    homeTeam: Team;
    awayTeam: Team;
    homeRerolls: number;
    awayRerolls: number;
}

interface MatchSetupProps {
    teams: Team[];
    onStartMatch: (
        selection: MatchSetupSelection,
    ) => void;
}

export function MatchSetup({
    teams,
    onStartMatch,
}: MatchSetupProps) {
    const [homeTeamId, setHomeTeamId] = useState(
        teams[0]?.id ?? "",
    );

    const [awayTeamId, setAwayTeamId] = useState(
        teams[1]?.id ?? teams[0]?.id ?? "",
    );

    const [homeRerolls, setHomeRerolls] = useState(3);
    const [awayRerolls, setAwayRerolls] = useState(3);

    const homeTeam =
        teams.find((team) => team.id === homeTeamId) ??
        teams[0];

    const awayTeam =
        teams.find((team) => team.id === awayTeamId) ??
        teams[1] ??
        teams[0];

    const hasEnoughTeams = teams.length >= 2;

    const hasDifferentTeams =
        homeTeam &&
        awayTeam &&
        homeTeam.id !== awayTeam.id;

    function handleHomeTeamChange(teamId: string) {
        setHomeTeamId(teamId);

        if (teamId === awayTeamId) {
            const replacementTeam = teams.find(
                (team) => team.id !== teamId,
            );

            if (replacementTeam) {
                setAwayTeamId(replacementTeam.id);
            }
        }
    }

    function handleAwayTeamChange(teamId: string) {
        setAwayTeamId(teamId);

        if (teamId === homeTeamId) {
            const replacementTeam = teams.find(
                (team) => team.id !== teamId,
            );

            if (replacementTeam) {
                setHomeTeamId(replacementTeam.id);
            }
        }
    }

    function handleSwapTeams() {
        const previousHomeTeamId = homeTeamId;
        const previousHomeRerolls = homeRerolls;

        setHomeTeamId(awayTeamId);
        setAwayTeamId(previousHomeTeamId);

        setHomeRerolls(awayRerolls);
        setAwayRerolls(previousHomeRerolls);
    }

    function handleStartMatch() {
        if (
            !homeTeam ||
            !awayTeam ||
            !hasDifferentTeams
        ) {
            return;
        }

        onStartMatch({
            homeTeam,
            awayTeam,
            homeRerolls,
            awayRerolls,
        });
    }

    if (!hasEnoughTeams) {
        return (
            <main className="match-setup match-setup--empty">
                <section className="match-setup__empty-message">
                    <h1>More teams required</h1>

                    <p>
                        Add at least two teams to the teams
                        array before starting a match.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="match-setup">
            <header className="match-setup__header">
                <p className="match-setup__eyebrow">
                    Blood Bowl Scoreboard
                </p>

                <h1 className="match-setup__title">
                    Choose Your Teams
                </h1>

                <p className="match-setup__subtitle">
                    Prepare the matchup before kickoff.
                </p>
            </header>

            <section className="match-setup__matchup">
                <TeamSelector
                    label="Home Team"
                    team={homeTeam}
                    teams={teams}
                    unavailableTeamId={awayTeamId}
                    rerolls={homeRerolls}
                    onTeamChange={handleHomeTeamChange}
                    onRerollsChange={setHomeRerolls}
                />

                <div className="match-setup__center">
                    <span
                        className="match-setup__versus"
                        aria-hidden="true"
                    >
                        VS
                    </span>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={handleSwapTeams}
                    >
                        Swap Teams
                    </button>
                </div>

                <TeamSelector
                    label="Away Team"
                    team={awayTeam}
                    teams={teams}
                    unavailableTeamId={homeTeamId}
                    rerolls={awayRerolls}
                    onTeamChange={handleAwayTeamChange}
                    onRerollsChange={setAwayRerolls}
                />
            </section>

            <footer className="match-setup__footer">
                {!hasDifferentTeams && (
                    <p
                        className="match-setup__error"
                        role="alert"
                    >
                        Home and away must be different teams.
                    </p>
                )}

                <button
                    type="button"
                    className="button button--primary match-setup__start"
                    onClick={handleStartMatch}
                    disabled={!hasDifferentTeams}
                >
                    Start Match
                </button>
            </footer>
        </main>
    );
}

interface TeamSelectorProps {
    label: string;
    team: Team;
    teams: Team[];
    unavailableTeamId: string;
    rerolls: number;
    onTeamChange: (teamId: string) => void;
    onRerollsChange: (rerolls: number) => void;
}

function TeamSelector({
    label,
    team,
    teams,
    unavailableTeamId,
    rerolls,
    onTeamChange,
    onRerollsChange,
}: TeamSelectorProps) {
    const cardStyle = {
        "--setup-team-primary": team.colors.primary,
        "--setup-team-secondary": team.colors.secondary,
        "--setup-team-accent": team.colors.accent,
        "--setup-team-text": team.colors.text,
    } as CSSProperties;

    function changeRerolls(amount: number) {
        onRerollsChange(
            Math.min(8, Math.max(0, rerolls + amount)),
        );
    }

    return (
        <article
            className="match-setup__team-card"
            style={cardStyle}
        >
            <p className="match-setup__side-label">
                {label}
            </p>

            <div className="match-setup__logo-area">
                <img
                    className="match-setup__team-logo"
                    src={team.assets.logo}
                    alt={`${team.name} logo`}
                />
            </div>

            <h2 className="match-setup__team-name">
                {team.name}
            </h2>

            <label className="match-setup__field">
                <span>Choose team</span>

                <select
                    value={team.id}
                    onChange={(event) =>
                        onTeamChange(event.target.value)
                    }
                >
                    {teams.map((optionTeam) => (
                        <option
                            key={optionTeam.id}
                            value={optionTeam.id}
                            disabled={
                                optionTeam.id ===
                                unavailableTeamId
                            }
                        >
                            {optionTeam.name}
                        </option>
                    ))}
                </select>
            </label>

            <div className="match-setup__rerolls">
                <span className="match-setup__rerolls-label">
                    Starting rerolls
                </span>

                <div className="match-setup__reroll-controls">
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => changeRerolls(-1)}
                        disabled={rerolls === 0}
                        aria-label={`Remove one ${team.name} reroll`}
                    >
                        −
                    </button>

                    <strong
                        className="match-setup__reroll-value"
                        aria-live="polite"
                    >
                        {rerolls}
                    </strong>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => changeRerolls(1)}
                        disabled={rerolls === 8}
                        aria-label={`Add one ${team.name} reroll`}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}