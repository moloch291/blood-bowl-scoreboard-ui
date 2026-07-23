import type { Dispatch } from "react";

import type {
    MatchState,
    TeamSide,
} from "../../types/match";

import type { matchReducer } from "../../reducers/matchReducer";

import "../../styles/control-panel.css";

type MatchAction = Parameters<typeof matchReducer>[1];

interface ControlPanelProps {
    state: MatchState;
    dispatch: Dispatch<MatchAction>;
    onTouchdown: (side: TeamSide) => void;
    onResetMatch: () => void;
}

export function ControlPanel({
    state,
    dispatch,
    onTouchdown,
    onResetMatch,
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

    function setHalf(half: 1 | 2) {
        dispatch({
            type: "SET_HALF",
            half,
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
                        Half
                    </h3>

                    <div className="control-panel__buttons">
                        <button
                            type="button"
                            className={`button ${state.half === 1
                                ? "button--primary"
                                : "button--secondary"
                                }`}
                            onClick={() => setHalf(1)}
                        >
                            First Half
                        </button>

                        <button
                            type="button"
                            className={`button ${state.half === 2
                                ? "button--primary"
                                : "button--secondary"
                                }`}
                            onClick={() => setHalf(2)}
                        >
                            Second Half
                        </button>
                    </div>
                </div>

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