import {
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";

import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { HalfTimeOverlay } from "../components/HalfTimeOverlay/HalfTimeOverlay";
import {
    MatchSetup,
    type MatchSetupSelection,
} from "../components/MatchSetup/MatchSetup";
import { Scoreboard } from "../components/ScoreBoard/Scoreboard";
import { TouchdownOverlay } from "../components/TouchdownOverlay/TouchdownOverlay";

import {
    blackwoodReapers,
    teams,
    templeSerpents,
} from "../data/teams";

import { matchReducer } from "../reducers/matchReducer";
import { createInitialMatchState } from "../utils/createInitialMatchState";

import type { MatchState, TeamSide } from "../types/match";
import type { Team } from "../types/team";

import "../styles/layout.css";

type AppScreen = "setup" | "match";

const defaultInitialState = createInitialMatchState(
    templeSerpents,
    blackwoodReapers,
    3,
    3,
);

export function MatchLayout() {
    const [screen, setScreen] =
        useState<AppScreen>("setup");

    const [state, dispatch] = useReducer(
        matchReducer,
        defaultInitialState,
    );

    const matchInitialStateRef =
        useRef<MatchState>(defaultInitialState);

    const [touchdownTeam, setTouchdownTeam] =
        useState<Team | null>(null);

    const [isTouchdownVisible, setIsTouchdownVisible] =
        useState(false);

    const [isHalfTimeVisible, setIsHalfTimeVisible] =
        useState(false);

    const touchdownTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const hasShownHalfTimeRef = useRef(false);

    const canStartSecondHalf =
        state.half === 1 &&
        state.home.turn === 8 &&
        state.away.turn === 8;

    function clearTouchdownTimer() {
        if (touchdownTimerRef.current) {
            clearTimeout(touchdownTimerRef.current);
            touchdownTimerRef.current = null;
        }
    }

    function clearOverlays() {
        clearTouchdownTimer();

        setTouchdownTeam(null);
        setIsTouchdownVisible(false);
        setIsHalfTimeVisible(false);

        hasShownHalfTimeRef.current = false;
    }

    useEffect(() => {
        return () => {
            clearTouchdownTimer();
        };
    }, []);

    useEffect(() => {
        if (
            screen === "match" &&
            canStartSecondHalf &&
            !hasShownHalfTimeRef.current
        ) {
            setIsHalfTimeVisible(true);
            hasShownHalfTimeRef.current = true;
        }

        if (!canStartSecondHalf) {
            hasShownHalfTimeRef.current = false;
            setIsHalfTimeVisible(false);
        }
    }, [canStartSecondHalf, screen]);

    function handleStartMatch({
        homeTeam,
        awayTeam,
        homeRerolls,
        awayRerolls,
    }: MatchSetupSelection) {
        const newMatchState = createInitialMatchState(
            homeTeam,
            awayTeam,
            homeRerolls,
            awayRerolls,
        );

        clearOverlays();

        matchInitialStateRef.current = newMatchState;

        dispatch({
            type: "RESET_MATCH",
            state: newMatchState,
        });

        setScreen("match");
    }

    function handleTouchdown(side: TeamSide) {
        const scoringTeam =
            side === "home"
                ? state.home.team
                : state.away.team;

        dispatch({
            type: "ADD_SCORE",
            side,
        });

        setTouchdownTeam(scoringTeam);
        setIsTouchdownVisible(true);

        clearTouchdownTimer();

        touchdownTimerRef.current = setTimeout(() => {
            setIsTouchdownVisible(false);
            touchdownTimerRef.current = null;
        }, 5000);
    }

    function handleStartSecondHalf() {
        if (!canStartSecondHalf) {
            return;
        }

        const startingState =
            matchInitialStateRef.current;

        setIsHalfTimeVisible(false);
        hasShownHalfTimeRef.current = false;

        dispatch({
            type: "START_SECOND_HALF",
            rerolls: {
                home: startingState.home.rerolls,
                away: startingState.away.rerolls,
            },
        });
    }

    function handleResetMatch() {
        const shouldReset = window.confirm(
            "End this match and return to team selection? The current score, turns, rerolls, and half will be lost.",
        );

        if (!shouldReset) {
            return;
        }

        clearOverlays();

        dispatch({
            type: "RESET_MATCH",
            state: matchInitialStateRef.current,
        });

        setScreen("setup");
    }

    if (screen === "setup") {
        return (
            <MatchSetup
                teams={teams}
                onStartMatch={handleStartMatch}
            />
        );
    }

    return (
        <main className="match-layout">
            <Scoreboard
                home={state.home}
                away={state.away}
                half={state.half}
            />

            <ControlPanel
                state={state}
                dispatch={dispatch}
                onTouchdown={handleTouchdown}
                onResetMatch={handleResetMatch}
                onOpenHalfTime={() =>
                    setIsHalfTimeVisible(true)
                }
                canStartSecondHalf={canStartSecondHalf}
            />

            <TouchdownOverlay
                team={touchdownTeam}
                isVisible={isTouchdownVisible}
            />

            <HalfTimeOverlay
                home={state.home}
                away={state.away}
                isVisible={isHalfTimeVisible}
                onStartSecondHalf={handleStartSecondHalf}
                onClose={() =>
                    setIsHalfTimeVisible(false)
                }
            />
        </main>
    );
}