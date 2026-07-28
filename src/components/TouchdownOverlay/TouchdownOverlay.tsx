import type { CSSProperties } from "react";

import type { Team } from "../../types/team";

import "./touchdown-overlay.css";

interface TouchdownOverlayProps {
    team: Team | null;
    isVisible: boolean;
}

interface TouchdownOverlayStyle extends CSSProperties {
    "--touchdown-primary": string;
    "--touchdown-secondary": string;
    "--touchdown-accent": string;
}

export function TouchdownOverlay({
    team,
    isVisible,
}: TouchdownOverlayProps) {
    if (!team) {
        return null;
    }

    const style: TouchdownOverlayStyle = {
        "--touchdown-primary": team.colors.primary,
        "--touchdown-secondary": team.colors.secondary,
        "--touchdown-accent": team.colors.accent,
    };

    return (
        <div
            className={[
                "touchdown-overlay",
                isVisible
                    ? "touchdown-overlay--visible"
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={style}
            role="status"
            aria-live="assertive"
            aria-hidden={!isVisible}
        >
            <div className="touchdown-overlay__ambient" />

            <div className="touchdown-overlay__artwork-reveal">
                <img
                    className="touchdown-overlay__artwork"
                    src={team.assets.touchdownImage}
                    alt=""
                    aria-hidden="true"
                />
            </div>

            <div className="touchdown-overlay__swipe">
                <div className="touchdown-overlay__swipe-glow" />
                <div className="touchdown-overlay__swipe-core" />
            </div>

            <div className="touchdown-overlay__impact" />
            <div className="touchdown-overlay__scanlines" />
            <div className="touchdown-overlay__vignette" />
        </div>
    );
}