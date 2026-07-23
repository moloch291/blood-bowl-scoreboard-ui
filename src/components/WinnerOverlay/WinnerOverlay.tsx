import type { CSSProperties } from "react";

import type { TeamMatchState } from "../../types/match";

import "./winner-overlay.css";

interface WinnerOverlayProps {
    home: TeamMatchState;
    away: TeamMatchState;
    isVisible: boolean;
    onReviewScoreboard: () => void;
    onNewMatch: () => void;
}

export function WinnerOverlay({
    home,
    away,
    isVisible,
    onReviewScoreboard,
    onNewMatch,
}: WinnerOverlayProps) {
    if (!isVisible) {
        return null;
    }

    const winner =
        home.score > away.score
            ? home
            : away.score > home.score
                ? away
                : null;

    const winnerStyle = winner
        ? ({
            "--winner-primary": winner.team.colors.primary,
            "--winner-secondary":
                winner.team.colors.secondary,
            "--winner-accent": winner.team.colors.accent,
            "--winner-text": winner.team.colors.text,
        } as CSSProperties)
        : undefined;

    return (
        <div
            className={`winner-overlay ${winner
                ? "winner-overlay--winner"
                : "winner-overlay--draw"
                }`}
            style={winnerStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="winner-title"
        >
            <div className="winner-overlay__backdrop" />

            <section className="winner-overlay__panel">
                {winner ? (
                    <>
                        <p className="winner-overlay__eyebrow">
                            Match winner
                        </p>

                        <h2
                            id="winner-title"
                            className="winner-overlay__title"
                        >
                            {winner.team.name} Win!
                        </h2>

                        <div className="winner-overlay__logo-area">
                            <img
                                className="winner-overlay__logo"
                                src={winner.team.assets.logo}
                                alt={`${winner.team.name} logo`}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <p className="winner-overlay__eyebrow">
                            Final result
                        </p>

                        <h2
                            id="winner-title"
                            className="winner-overlay__title"
                        >
                            Draw!
                        </h2>

                        <div className="winner-overlay__draw-teams">
                            <img
                                src={home.team.assets.logo}
                                alt={`${home.team.name} logo`}
                            />

                            <span aria-hidden="true">VS</span>

                            <img
                                src={away.team.assets.logo}
                                alt={`${away.team.name} logo`}
                            />
                        </div>
                    </>
                )}

                <div className="winner-overlay__final-score">
                    <span>{home.score}</span>
                    <span aria-hidden="true">—</span>
                    <span>{away.score}</span>
                </div>

                <p className="winner-overlay__teams">
                    {home.team.name} vs {away.team.name}
                </p>

                <div className="winner-overlay__actions">
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={onReviewScoreboard}
                    >
                        Review Scoreboard
                    </button>

                    <button
                        type="button"
                        className="button button--primary"
                        onClick={onNewMatch}
                        autoFocus
                    >
                        New Match
                    </button>
                </div>
            </section>
        </div>
    );
}