import {
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";

import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { HalfTimeOverlay } from "../components/HalfTimeOverlay/HalfTimeOverlay";
import { Scoreboard } from "../components/ScoreBoard/Scoreboard";
import { TouchdownOverlay } from "../components/TouchdownOverlay/TouchdownOverlay";

import {
    blackwoodReapers,
    templeSerpents,
} from "../data/teams";

import { matchReducer } from "../reducers/matchReducer";

import type { Team } from "../types/team";
import type {
    MatchState,
    TeamSide,
} from "../types/match";

import "../styles/layout.css";

const initialState: MatchState = {
    home: {
        team: templeSerpents,
        score: 0,
        turn: 0,
        rerolls: 3,
    },

    away: {
        team: blackwoodReapers,
        score: 0,
        turn: 0,
        rerolls: 3,
    },

    half: 1,
};

export function MatchLayout() {
    const [state, dispatch] = useReducer(
        matchReducer,
        initialState,
    );

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

    useEffect(() => {
        return () => {
            clearTouchdownTimer();
        };
    }, []);

    useEffect(() => {
        if (
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
    }, [canStartSecondHalf]);

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

        setIsHalfTimeVisible(false);
        hasShownHalfTimeRef.current = false;

        dispatch({
            type: "START_SECOND_HALF",
            rerolls: {
                home: initialState.home.rerolls,
                away: initialState.away.rerolls,
            },
        });
    }

    function handleResetMatch() {
        const shouldReset = window.confirm(
            "Reset the entire match? Scores, turns, rerolls, and the current half will be lost.",
        );

        if (!shouldReset) {
            return;
        }

        clearTouchdownTimer();

        setTouchdownTeam(null);
        setIsTouchdownVisible(false);
        setIsHalfTimeVisible(false);

        hasShownHalfTimeRef.current = false;

        dispatch({
            type: "RESET_MATCH",
            state: initialState,
        });
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