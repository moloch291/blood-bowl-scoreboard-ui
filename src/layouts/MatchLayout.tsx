import {
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import { BroadcastOverlay } from "../components/BroadcastOverlay/BroadcastOverlay";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { FinalScoreOverlay } from "../components/FinalsScoreOverlay/FinalScoreOverlay";
import { HalfTimeOverlay } from "../components/HalfTimeOverlay/HalfTimeOverlay";
import {
    MatchSetup,
    type MatchSetupSelection,
} from "../components/MatchSetup/MatchSetup";
import { Scoreboard } from "../components/ScoreBoard/Scoreboard";
import { TouchdownOverlay } from "../components/TouchdownOverlay/TouchdownOverlay";

import {
    sylvaniaNightmares,
    teams,
    templeSerpents,
} from "../data/teams";

import { matchReducer } from "../reducers/matchReducer";
import { createInitialMatchState } from "../utils/createInitialMatchState";

import type { MatchState, TeamSide } from "../types/match";
import type { Team } from "../types/team";

import "../styles/layout.css";

type AppScreen = "setup" | "match";

type MatchEndStage =
    | "none"
    | "final-score";

const defaultInitialState = createInitialMatchState(
    templeSerpents,
    sylvaniaNightmares,
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

    interface TurnAnnouncement {
        team: Team;
        turn: number;
    }

    const [
        turnAnnouncement,
        setTurnAnnouncement,
    ] = useState<TurnAnnouncement | null>(null);

    const touchdownAnimationFrameRef =
        useRef<number | null>(null);

    const matchInitialStateRef =
        useRef<MatchState>(defaultInitialState);

    const [touchdownTeam, setTouchdownTeam] =
        useState<Team | null>(null);

    const [isTouchdownVisible, setIsTouchdownVisible] =
        useState(false);

    const [isHalfTimeVisible, setIsHalfTimeVisible] =
        useState(false);

    const [matchEndStage, setMatchEndStage] =
        useState<MatchEndStage>("none");

    const touchdownTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeTurnSide, setActiveTurnSide] =
        useState<TeamSide | null>(null);

    const hasShownHalfTimeRef = useRef(false);
    const hasShownFullTimeRef = useRef(false);

    const canStartSecondHalf =
        state.half === 1 &&
        state.home.hasFinishedHalf &&
        state.away.hasFinishedHalf;

    const isMatchFinished =
        state.half === 2 &&
        state.home.hasFinishedHalf &&
        state.away.hasFinishedHalf;

    function clearTouchdownTimer() {
        if (touchdownTimerRef.current) {
            clearTimeout(touchdownTimerRef.current);
            touchdownTimerRef.current = null;
        }
    }

    function clearTouchdownAnimationFrame() {
        if (touchdownAnimationFrameRef.current !== null) {
            cancelAnimationFrame(
                touchdownAnimationFrameRef.current,
            );

            touchdownAnimationFrameRef.current = null;
        }
    }

    function clearOverlays() {
        clearTouchdownTimer();
        clearTouchdownAnimationFrame();
        setActiveTurnSide(null);
        setTouchdownTeam(null);
        setIsTouchdownVisible(false);
        setIsHalfTimeVisible(false);
        setMatchEndStage("none");

        hasShownHalfTimeRef.current = false;
        hasShownFullTimeRef.current = false;
    }

    useEffect(() => {
        return () => {
            clearTouchdownTimer();
            clearTouchdownAnimationFrame();
        };
    }, []);

    useEffect(() => {
        if (
            screen === "match" &&
            canStartSecondHalf &&
            !hasShownHalfTimeRef.current
        ) {
            setActiveTurnSide(null);
            setIsHalfTimeVisible(true);
            hasShownHalfTimeRef.current = true;
        }

        if (!canStartSecondHalf) {
            hasShownHalfTimeRef.current = false;
            setIsHalfTimeVisible(false);
        }
    }, [canStartSecondHalf, screen]);

    useEffect(() => {
        if (
            screen === "match" &&
            isMatchFinished &&
            !hasShownFullTimeRef.current
        ) {
            clearTouchdownTimer();

            setTouchdownTeam(null);
            setIsTouchdownVisible(false);
            setIsHalfTimeVisible(false);
            setMatchEndStage("final-score");

            hasShownFullTimeRef.current = true;
        }

        if (!isMatchFinished) {
            hasShownFullTimeRef.current = false;
            setMatchEndStage("none");
        }
    }, [isMatchFinished, screen]);

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

        setActiveTurnSide(null);
        setScreen("match");
        clearOverlays();

        matchInitialStateRef.current = newMatchState;

        dispatch({
            type: "RESET_MATCH",
            state: newMatchState,
        });

        setScreen("match");
    }

    function handleStartTurn(side: TeamSide) {
        if (isMatchFinished) {
            return;
        }

        const teamState =
            side === "home"
                ? state.home
                : state.away;

        if (
            teamState.turn >= 8 ||
            teamState.hasFinishedHalf
        ) {
            return;
        }

        const nextTurn = teamState.turn + 1;

        dispatch({
            type: "NEXT_TURN",
            side,
        });

        setActiveTurnSide(side);

        setTurnAnnouncement({
            team: teamState.team,
            turn: nextTurn,
        });
    }

    function handleTouchdown(side: TeamSide) {
        if (isMatchFinished) {
            return;
        }

        const scoringTeam =
            side === "home"
                ? state.home.team
                : state.away.team;

        dispatch({
            type: "ADD_SCORE",
            side,
        });

        clearTouchdownTimer();
        clearTouchdownAnimationFrame();

        // Mount/reset the overlay in its hidden state first.
        setIsTouchdownVisible(false);
        setTouchdownTeam(scoringTeam);

        // Wait until the hidden state has been painted.
        touchdownAnimationFrameRef.current =
            requestAnimationFrame(() => {
                touchdownAnimationFrameRef.current =
                    requestAnimationFrame(() => {
                        setIsTouchdownVisible(true);
                        touchdownAnimationFrameRef.current = null;
                    });
            });

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
        setActiveTurnSide(null);

        dispatch({
            type: "START_SECOND_HALF",
            rerolls: {
                home: startingState.home.rerolls,
                away: startingState.away.rerolls,
            },
        });
    }

    function handleReviewScoreboard() {
        setIsHalfTimeVisible(false);
        setMatchEndStage("none");
    }

    function handleOpenFinalScore() {
        if (!isMatchFinished) {
            return;
        }

        setMatchEndStage("final-score");
    }

    function handleNewMatch() {
        clearOverlays();

        dispatch({
            type: "RESET_MATCH",
            state: matchInitialStateRef.current,
        });

        setScreen("setup");
    }

    function handleResetMatch() {
        const shouldReset = window.confirm(
            "End this match and return to team selection? The current score, turns, rerolls, and half will be lost.",
        );

        if (!shouldReset) {
            return;
        }

        handleNewMatch();
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
                activeSide={activeTurnSide}
            />
            <ControlPanel
                state={state}
                dispatch={dispatch}
                onStartTurn={handleStartTurn}
                onTouchdown={handleTouchdown}
                onResetMatch={handleResetMatch}
                onOpenHalfTime={() =>
                    setIsHalfTimeVisible(true)
                }
                onOpenFinalScore={handleOpenFinalScore}
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
            <FinalScoreOverlay
                home={state.home}
                away={state.away}
                isVisible={matchEndStage === "final-score"}
                onNewMatch={handleNewMatch}
                onReviewScoreboard={handleReviewScoreboard}
            />
            <BroadcastOverlay
                team={turnAnnouncement?.team ?? null}
                isOpen={turnAnnouncement !== null}
                eyebrow="Possession"
                title="Next Turn"
                subtitle={
                    turnAnnouncement
                        ? `${turnAnnouncement.team.name} • Turn ${turnAnnouncement.turn}`
                        : ""
                }
                onExited={() => setTurnAnnouncement(null)}
            />
        </main>
    );
}