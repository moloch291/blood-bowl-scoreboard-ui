import type { TeamMatchState } from "../../types/match";

import "./half-time-overlay.css";

interface HalfTimeOverlayProps {
    home: TeamMatchState;
    away: TeamMatchState;
    isVisible: boolean;
    onStartSecondHalf: () => void;
    onClose: () => void;
}

export function HalfTimeOverlay({
    home,
    away,
    isVisible,
    onStartSecondHalf,
    onClose,
}: HalfTimeOverlayProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div
            className="half-time-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="half-time-title"
        >
            <div className="half-time-overlay__backdrop" />

            <section className="half-time-overlay__panel">
                <p className="half-time-overlay__eyebrow">
                    End of first half
                </p>

                <h2
                    id="half-time-title"
                    className="half-time-overlay__title"
                >
                    Half Time
                </h2>

                <div className="half-time-overlay__score">
                    <div className="half-time-overlay__team">
                        <img
                            className="half-time-overlay__icon"
                            src={home.team.assets.logo}
                            alt=""
                            aria-hidden="true"
                        />

                        <span className="half-time-overlay__team-name">
                            {home.team.shortName}
                        </span>

                        <strong className="half-time-overlay__team-score">
                            {home.score}
                        </strong>
                    </div>

                    <span
                        className="half-time-overlay__divider"
                        aria-hidden="true"
                    >
                        –
                    </span>

                    <div className="half-time-overlay__team">
                        <strong className="half-time-overlay__team-score">
                            {away.score}
                        </strong>

                        <span className="half-time-overlay__team-name">
                            {away.team.shortName}
                        </span>

                        <img
                            className="half-time-overlay__icon"
                            src={away.team.assets.logo}
                            alt=""
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <p className="half-time-overlay__message">
                    Starting the second half will reset both
                    teams to Turn 0 and restore their rerolls.
                </p>

                <div className="half-time-overlay__actions">
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={onClose}
                    >
                        Review Match
                    </button>

                    <button
                        type="button"
                        className="button button--primary"
                        onClick={onStartSecondHalf}
                        autoFocus
                    >
                        Start Second Half
                    </button>
                </div>
            </section>
        </div>
    );
}