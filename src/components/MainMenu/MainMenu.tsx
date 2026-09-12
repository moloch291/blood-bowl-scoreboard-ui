import leagueLogo from "../../assets/league-logo.png";

import "./main-menu.css";

interface MainMenuProps {
    onPlayGame: () => void;
    onOpenLeague: () => void;
}

export function MainMenu({
    onPlayGame,
    onOpenLeague,
}: MainMenuProps) {
    return (
        <main className="main-menu">
            <section className="main-menu__content">
                <img
                    className="main-menu__logo"
                    src={leagueLogo}
                    alt="League"
                />

                <div className="main-menu__heading">
                    <p className="main-menu__eyebrow">
                        Blood Bowl Scoreboard
                    </p>

                    <h1 className="main-menu__title">
                        Main Menu
                    </h1>
                </div>

                <nav
                    className="main-menu__actions"
                    aria-label="Main menu"
                >
                    <button
                        type="button"
                        className="button button--primary main-menu__button"
                        onClick={onPlayGame}
                    >
                        Play a Game
                    </button>

                    <button
                        type="button"
                        className="button button--secondary main-menu__button"
                        onClick={onOpenLeague}
                    >
                        League
                    </button>
                </nav>
            </section>
        </main>
    );
}