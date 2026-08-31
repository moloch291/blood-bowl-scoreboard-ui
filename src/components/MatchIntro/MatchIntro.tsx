import {
    useEffect,
    useState,
    type CSSProperties,
} from "react";
import type { Team } from "../../types/team";
import leagueIcon from "../../assets/league-logo.png";

import "./match-intro.css";

interface MatchIntroProps {
    homeTeam: Team;
    awayTeam: Team;
    onComplete: () => void;
}

export function MatchIntro({
    homeTeam,
    awayTeam,
    onComplete,
}: MatchIntroProps) {

    const introStyle = {
        "--intro-home-primary": homeTeam.colors.primary,
        "--intro-home-secondary": homeTeam.colors.secondary,
        "--intro-home-accent": homeTeam.colors.accent,

        "--intro-away-primary": awayTeam.colors.primary,
        "--intro-away-secondary": awayTeam.colors.secondary,
        "--intro-away-accent": awayTeam.colors.accent,
    } as CSSProperties;

    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const exitTimer = window.setTimeout(() => {
            setIsExiting(true);
        }, 2400);

        const completeTimer = window.setTimeout(() => {
            onComplete();
        }, 3100);

        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <main
            className={["match-intro", isExiting ? "match-intro--exiting" : "",].filter(Boolean).join(" ")}
            style={introStyle}
        >
            <section className="match-intro__team match-intro__team--home">
                <img
                    className="match-intro__team-logo"
                    src={homeTeam.assets.logo}
                    alt={`${homeTeam.name} logo`}
                />
            </section>

            <div className="match-intro__center">
                <img
                    className="match-intro__league-icon"
                    src={leagueIcon}
                    alt=""
                    aria-hidden="true"
                />

                <span className="match-intro__versus">
                    VS
                </span>
            </div>

            <div
                className="match-intro__exit-wipe"
                aria-hidden="true"
            />

            <section className="match-intro__team match-intro__team--away">
                <img
                    className="match-intro__team-logo"
                    src={awayTeam.assets.logo}
                    alt={`${awayTeam.name} logo`}
                />
            </section>
        </main>
    );
}