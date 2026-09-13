import {
    useEffect,
    useState,
} from "react";

import type {
    ConferenceTeam,
    GameResultInput,
} from "../../types/league";

interface GameResultOverlayProps {
    conferenceTitle: string;
    teams: ConferenceTeam[];
    onClose: () => void;
    onSubmit: (
        result: GameResultInput,
    ) => Promise<void>;
}

export function GameResultOverlay({
    conferenceTitle,
    teams,
    onClose,
    onSubmit,
}: GameResultOverlayProps) {
    const [teamName, setTeamName] =
        useState("");

    const [points, setPoints] =
        useState(0);

    const [touchdowns, setTouchdowns] =
        useState(0);

    const [casualties, setCasualties] =
        useState(0);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (teams.length > 0) {
            setTeamName(teams[0].team_name);
        }
    }, [teams]);

    async function handleSubmit() {
        if (!teamName) {
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await onSubmit({
                teamName,
                points,
                touchdowns,
                casualties,
            });
        } catch (error) {
            console.error(error);

            setError(
                "Unable to save game result.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="game-result-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-result-title"
        >
            <div className="game-result-overlay__panel">
                <div className="game-result-overlay__header">
                    <div>
                        <p className="game-result-overlay__eyebrow">
                            {conferenceTitle}
                        </p>

                        <h2
                            id="game-result-title"
                            className="game-result-overlay__title"
                        >
                            Add Game Result
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Close
                    </button>
                </div>

                <label className="game-result-overlay__field">
                    <span>Team</span>

                    <select
                        value={teamName}
                        onChange={(event) =>
                            setTeamName(
                                event.target.value,
                            )
                        }
                    >
                        {teams.map((team) => (
                            <option
                                key={team.team_name}
                                value={team.team_name}
                            >
                                {team.team_name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="game-result-overlay__stats">
                    <NumberField
                        label="League Points"
                        value={points}
                        onChange={setPoints}
                    />

                    <NumberField
                        label="Touchdowns"
                        value={touchdowns}
                        onChange={setTouchdowns}
                    />

                    <NumberField
                        label="Casualties"
                        value={casualties}
                        onChange={setCasualties}
                    />
                </div>

                <p className="game-result-overlay__games-note">
                    Games played will increase by 1.
                </p>

                {error && (
                    <p className="game-result-overlay__error">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    className="button button--primary game-result-overlay__submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : "Add Result"}
                </button>
            </div>
        </div>
    );
}

interface NumberFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

function NumberField({
    label,
    value,
    onChange,
}: NumberFieldProps) {
    return (
        <label className="game-result-overlay__field">
            <span>{label}</span>

            <input
                type="number"
                min="0"
                step="1"
                value={value}
                onChange={(event) =>
                    onChange(
                        Math.max(
                            0,
                            Number(
                                event.target.value,
                            ),
                        ),
                    )
                }
            />
        </label>
    );
}
