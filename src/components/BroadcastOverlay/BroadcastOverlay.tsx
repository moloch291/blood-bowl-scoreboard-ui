import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

import type { Team } from "../../types/team";

import "./broadcast-overlay.css"

type BroadcastOverlayPhase =
    | "hidden"
    | "entering"
    | "holding"
    | "exiting";

type BroadcastMotionTheme =
    | "default"
    | "heavy"
    | "elegant"
    | "metallic"
    | "chaos"
    | "undead";

interface BroadcastOverlayProps {
    team: Team | null;
    isOpen: boolean;

    eyebrow?: string;
    title: string;
    subtitle?: string;

    duration?: number;
    children?: ReactNode;

    motionTheme?: BroadcastMotionTheme;

    onExited?: () => void;
}

interface BroadcastOverlayStyles extends CSSProperties {
    "--broadcast-primary": string;
    "--broadcast-secondary": string;
    "--broadcast-accent": string;
    "--broadcast-text": string;
}

const ENTER_DURATION = 900;
const EXIT_DURATION = 650;
const DEFAULT_DURATION = 3000;

export function BroadcastOverlay({
    team,
    isOpen,
    eyebrow,
    title,
    subtitle,
    duration = DEFAULT_DURATION,
    children,
    motionTheme = "default",
    onExited,
}: BroadcastOverlayProps) {
    const [phase, setPhase] =
        useState<BroadcastOverlayPhase>("hidden");

    const enterTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const holdTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const exitTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    function clearTimers() {
        if (enterTimerRef.current) {
            clearTimeout(enterTimerRef.current);
            enterTimerRef.current = null;
        }

        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }

        if (exitTimerRef.current) {
            clearTimeout(exitTimerRef.current);
            exitTimerRef.current = null;
        }
    }

    useEffect(() => {
        clearTimers();

        if (!isOpen || !team) {
            setPhase((currentPhase) => {
                if (currentPhase === "hidden") {
                    return "hidden";
                }

                return "exiting";
            });

            exitTimerRef.current = setTimeout(() => {
                setPhase("hidden");
                onExited?.();
            }, EXIT_DURATION);

            return clearTimers;
        }

        setPhase("entering");

        enterTimerRef.current = setTimeout(() => {
            setPhase("holding");
        }, ENTER_DURATION);

        holdTimerRef.current = setTimeout(() => {
            setPhase("exiting");

            exitTimerRef.current = setTimeout(() => {
                setPhase("hidden");
                onExited?.();
            }, EXIT_DURATION);
        }, duration);

        return clearTimers;
    }, [duration, isOpen, onExited, team]);

    if (!team || phase === "hidden") {
        return null;
    }

    const styles: BroadcastOverlayStyles = {
        "--broadcast-primary": team.colors.primary,
        "--broadcast-secondary": team.colors.secondary,
        "--broadcast-accent": team.colors.accent,
        "--broadcast-text": team.colors.text,
    };

    return (
        <section
            className={[
                "broadcast-overlay",
                `broadcast-overlay--${phase}`,
                `broadcast-overlay--theme-${motionTheme}`,
            ].join(" ")}
            style={styles}
            aria-hidden={!isOpen}
        >
            <div className="broadcast-overlay__backdrop" />

            <div className="broadcast-overlay__color-wipe" />

            <div className="broadcast-overlay__energy">
                <span className="broadcast-overlay__streak broadcast-overlay__streak--one" />
                <span className="broadcast-overlay__streak broadcast-overlay__streak--two" />
                <span className="broadcast-overlay__streak broadcast-overlay__streak--three" />
            </div>

            <div className="broadcast-overlay__panels">
                <div className="broadcast-overlay__panel broadcast-overlay__panel--left" />
                <div className="broadcast-overlay__panel broadcast-overlay__panel--right" />
            </div>

            <div className="broadcast-overlay__screen-shine" />

            <div className="broadcast-overlay__content">
                <div className="broadcast-overlay__logo-shell">
                    <div className="broadcast-overlay__logo-glow" />

                    <img
                        className="broadcast-overlay__logo"
                        src={team.assets.logo}
                        alt=""
                    />
                </div>

                <div className="broadcast-overlay__copy">
                    {eyebrow && (
                        <p className="broadcast-overlay__eyebrow">
                            {eyebrow}
                        </p>
                    )}

                    <h2 className="broadcast-overlay__title">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="broadcast-overlay__subtitle">
                            {subtitle}
                        </p>
                    )}

                    {children}
                </div>
            </div>

            <div className="broadcast-overlay__edge" />
        </section>
    );
}