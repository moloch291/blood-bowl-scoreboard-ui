import type { CSSProperties } from "react";

import type { TeamMatchState } from "../../types/match";

import "./final-score-overlay.css";

interface FinalScoreOverlayProps {
    home: TeamMatchState;
    away: TeamMatchState;
    isVisible: boolean;
    onAnnounceResult: () => void;
    onReviewScoreboard: () => void;
}

export function FinalScoreOverlay({
    home,
    away,
    isVisible,
    onAnnounceResult,
    onReviewScoreboard,
}: FinalScoreOverlayProps) {
    if (!isVisible) {
        return null;
    }

    const homeStyle = {
        "--result-primary": home.team.colors.primary,
        "--result-secondary": home.team.colors.secondary,
        "--result-accent": home.team.colors.accent,
        "--result-text": home.team.colors.text,
    } as CSSProperties;

    const awayStyle = {
        "--result-primary": away.team.colors.primary,
        "--result-secondary": away.team.colors.secondary,
        "--result-accent": away.team.colors.accent,
        "--result-text": away.team.colors.text,
    } as CSSProperties;

    const resultText =
        home.score > away.score
            ? `${home.team.name} defeat ${away.team.name}`
            : away.score > home.score
                ? `${away.team.name} defeat ${home.team.name}`
                : "The match ends in a draw";

    return (
        <div
            className="final-score-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="final-score-title"
        >
            <div className="final-score-overlay__backdrop" />

            <section className="final-score-overlay__panel">
                <header className="final-score-overlay__header">
                    <p className="final-score-overlay__eyebrow">
                        Match complete
                    </p>

                    <h2
                        id="final-score-title"
                        className="final-score-overlay__title"
                    >
                        Full Time
                    </h2>
                </header>

                <div className="final-score-overlay__matchup">
                    <article
                        className="final-score-overlay__team"
                        style={homeStyle}
                    >
                        <span className="final-score-overlay__side">
                            Home
                        </span>

                        <div className="final-score-overlay__wordmark-area">
                            <img
                                className="final-score-overlay__wordmark"
                                src={home.team.assets.wordmark}
                                alt={home.team.name}
                            />
                        </div>

                        <strong className="final-score-overlay__score">
                            {home.score}
                        </strong>
                    </article>

                    <div className="final-score-overlay__separator">
                        <span aria-hidden="true">—</span>
                        <span className="final-score-overlay__versus">
                            Final
                        </span>
                    </div>

                    <article
                        className="final-score-overlay__team"
                        style={awayStyle}
                    >
                        <span className="final-score-overlay__side">
                            Away
                        </span>

                        <div className="final-score-overlay__wordmark-area">
                            <img
                                className="final-score-overlay__wordmark"
                                src={away.team.assets.wordmark}
                                alt={away.team.name}
                            />
                        </div>

                        <strong className="final-score-overlay__score">
                            {away.score}
                        </strong>
                    </article>
                </div>

                <p className="final-score-overlay__result">
                    {resultText}
                </p>

                <div className="final-score-overlay__actions">
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
                        onClick={onAnnounceResult}
                        autoFocus
                    >
                        Announce Result
                    </button>
                </div>
            </section>
        </div>
    );
}