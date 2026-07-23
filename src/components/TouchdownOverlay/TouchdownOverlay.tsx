import type { Team } from "../../types/team";
import "./touchdown-overlay.css";

interface TouchdownOverlayProps {
    team: Team | null;
    isVisible: boolean;
}

export function TouchdownOverlay({
    team,
    isVisible,
}: TouchdownOverlayProps) {
    if (!team) {
        return null;
    }

    return (
        <div
            className={`touchdown-overlay ${isVisible ? "touchdown-overlay--visible" : ""
                }`}
            role="status"
            aria-live="assertive"
            aria-hidden={!isVisible}
        >
            <img
                className="touchdown-overlay__artwork"
                src={team.assets.touchdownImage}
                alt=""
                aria-hidden="true"
            />

            <div
                className="touchdown-overlay__shade"
                aria-hidden="true"
            />
        </div>
    );
}