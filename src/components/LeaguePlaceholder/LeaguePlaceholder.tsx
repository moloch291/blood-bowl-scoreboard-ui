import leagueLogo from "../../assets/league-logo.png";

import "./league-placeholder.css";

interface LeaguePlaceholderProps {
    onBack: () => void;
}

export function LeaguePlaceholder({
    onBack,
}: LeaguePlaceholderProps) {
    return (
        <main className="league-placeholder">
            <section className="league-placeholder__content">
                <img
                    className="league-placeholder__logo"
                    src={leagueLogo}
                    alt="League"
                />

                <p className="league-placeholder__eyebrow">
                    League
                </p>

                <h1 className="league-placeholder__title">
                    Under Construction
                </h1>

                <p className="league-placeholder__message">
                    League features are coming soon.
                </p>

                <button
                    type="button"
                    className="button button--secondary league-placeholder__back"
                    onClick={onBack}
                >
                    Back to Main Menu
                </button>
            </section>
        </main>
    );
}