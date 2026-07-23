import type { Dispatch } from "react";

import type {
    MatchState,
    TeamSide,
} from "../../types/match";

import type { MatchAction } from "../../reducers/matchReducer";

import "../../styles/control-panel.css";

interface ControlPanelProps {
    state: MatchState;
    dispatch: Dispatch<MatchAction>;
    onTouchdown: (side: TeamSide) => void;
    onResetMatch: () => void;
    onOpenHalfTime: () => void;
    canStartSecondHalf: boolean;
}

export function ControlPanel({
    state,
    dispatch,
    onTouchdown,
    onResetMatch,
    onOpenHalfTime,
    canStartSecondHalf,
}: ControlPanelProps) {
    function removeScore(side: TeamSide) {
        dispatch({
            type: "REMOVE_SCORE",
            side,
        });
    }

    function nextTurn(side: TeamSide) {
        dispatch({
            type: "NEXT_TURN",
            side,
        });
    }

    function previousTurn(side: TeamSide) {
        dispatch({
            type: "PREVIOUS_TURN",
            side,
        });
    }

    function useReroll(side: TeamSide) {
        dispatch({
            type: "USE_REROLL",
            side,
        });
    }

    function restoreReroll(side: TeamSide) {
        dispatch({
            type: "RESTORE_REROLL",
            side,
        });
    }

    return (
        <section
            className="control-panel"
            aria-label="Match controls"
        >
            <div className="control-panel__team">
                <h2 className="control-panel__team-name">
                    {state.home.team.name}
                </h2>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Score
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => removeScore("home")}
                            disabled={state.home.score === 0}
                        >
                            − Score
                        </button>

                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => onTouchdown("home")}
                        >
                            Touchdown
                        </button>
                    </div>
                </div>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Turn
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => previousTurn("home")}
                            disabled={state.home.turn === 0}
                        >
                            − Turn
                        </button>

                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => nextTurn("home")}
                            disabled={state.home.turn === 8}
                        >
                            + Turn
                        </button>
                    </div>
                </div>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Rerolls
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => useReroll("home")}
                            disabled={state.home.rerolls === 0}
                        >
                            Use Reroll
                        </button>

                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => restoreReroll("home")}
                        >
                            Restore
                        </button>
                    </div>
                </div>
            </div>

            <div className="control-panel__match">
                <h2 className="control-panel__match-title">
                    Match
                </h2>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Current Half
                    </h3>

                    <strong>
                        {state.half === 1
                            ? "First Half"
                            : "Second Half"}
                    </strong>
                </div>

                {state.half === 1 && (
                    <div className="control-panel__group">
                        <button
                            type="button"
                            className="button button--primary"
                            onClick={onOpenHalfTime}
                            disabled={!canStartSecondHalf}
                        >
                            Review Half Time
                        </button>

                        {!canStartSecondHalf && (
                            <p>
                                Both teams must reach Turn 8.
                            </p>
                        )}
                    </div>
                )}

                {state.half === 2 && (
                    <p>
                        Second half in progress
                    </p>
                )}

                <button
                    type="button"
                    className="button button--danger"
                    onClick={onResetMatch}
                >
                    Reset Match
                </button>
            </div>

            <div className="control-panel__team">
                <h2 className="control-panel__team-name">
                    {state.away.team.name}
                </h2>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Score
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => onTouchdown("away")}
                        >
                            Touchdown
                        </button>

                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => removeScore("away")}
                            disabled={state.away.score === 0}
                        >
                            − Score
                        </button>
                    </div>
                </div>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Turn
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => nextTurn("away")}
                            disabled={state.away.turn === 8}
                        >
                            + Turn
                        </button>

                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => previousTurn("away")}
                            disabled={state.away.turn === 0}
                        >
                            − Turn
                        </button>
                    </div>
                </div>

                <div className="control-panel__group">
                    <h3 className="control-panel__group-title">
                        Rerolls
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className="button button--primary"
                            onClick={() => restoreReroll("away")}
                        >
                            Restore
                        </button>

                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={() => useReroll("away")}
                            disabled={state.away.rerolls === 0}
                        >
                            Use Reroll
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}