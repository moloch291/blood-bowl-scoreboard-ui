import {
    useEffect,
    useState,
} from "react";
import type { Team } from "../../types/team";
import leagueIcon from "../../assets/league-logo.png";

import "./match-intro.css";

interface MatchIntroProps {
    homeTeam: Team;
    awayTeam: Team;
    onExitStart: () => void;
    onComplete: () => void;
}

export function MatchIntro({
    homeTeam,
    awayTeam,
    onExitStart,
    onComplete,
}: MatchIntroProps) {

    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const exitTimer = window.setTimeout(() => {
            onExitStart();
            setIsExiting(true);
        }, 2400);

        const completeTimer = window.setTimeout(() => {
            onComplete();
        }, 2800);

        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(completeTimer);
        };
    }, [onExitStart, onComplete]);

    return (
        <main className={["match-intro", isExiting ? "match-intro--exiting" : "",].filter(Boolean).join(" ")}>
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