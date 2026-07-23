import type { Dispatch } from "react";
import type { MatchAction } from "../../reducers/matchReducer";
import type {
    MatchState,
    TeamSide,
} from "../../types/match";

type ControlPanelProps = {
    match: MatchState;
    dispatch: Dispatch<MatchAction>;
    initialMatch: MatchState;
};

type TeamControlsProps = {
    side: TeamSide;
    match: MatchState;
    dispatch: Dispatch<MatchAction>;
};

function TeamControls({
    side,
    match,
    dispatch,
}: TeamControlsProps) {
    const teamState = match[side];
    const isHome = side === "home";

    return (
        <section
            className={`control-panel__team ${isHome
                    ? "control-panel__team--home"
                    : "control-panel__team--away"
                }`}
        >
            <div>
                <p className="control-panel__label">
                    {isHome ? "Home team" : "Away team"}
                </p>

                <h2>{teamState.team.name}</h2>
            </div>

            <div className="control-panel__group">
                <span>Score: {teamState.score}</span>

                <div className="control-panel__buttons">
                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "REMOVE_SCORE",
                                side,
                            })
                        }
                    >
                        − Score
                    </button>

                    <button
                        className={`button ${isHome
                                ? "button--primary"
                                : "button--reapers"
                            }`}
                        onClick={() =>
                            dispatch({
                                type: "ADD_SCORE",
                                side,
                            })
                        }
                    >
                        + Touchdown
                    </button>
                </div>
            </div>

            <div className="control-panel__group">
                <span>Turn: {teamState.turn}</span>

                <div className="control-panel__buttons">
                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "PREVIOUS_TURN",
                                side,
                            })
                        }
                    >
                        − Turn
                    </button>

                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "NEXT_TURN",
                                side,
                            })
                        }
                    >
                        + Turn
                    </button>
                </div>
            </div>

            <div className="control-panel__group">
                <span>Rerolls: {teamState.rerolls}</span>

                <div className="control-panel__buttons">
                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "USE_REROLL",
                                side,
                            })
                        }
                    >
                        Use reroll
                    </button>

                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "RESTORE_REROLL",
                                side,
                            })
                        }
                    >
                        Restore
                    </button>
                </div>
            </div>
        </section>
    );
}

export function ControlPanel({
    match,
    dispatch,
    initialMatch,
}: ControlPanelProps) {
    return (
        <section className="control-panel">
            <TeamControls
                side="home"
                match={match}
                dispatch={dispatch}
            />

            <div className="control-panel__match">
                <p className="control-panel__label">
                    Match controls
                </p>

                <h2>
                    {match.half === 1
                        ? "First Half"
                        : "Second Half"}
                </h2>

                <div className="control-panel__buttons">
                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "SET_HALF",
                                half: 1,
                            })
                        }
                    >
                        First half
                    </button>

                    <button
                        className="button"
                        onClick={() =>
                            dispatch({
                                type: "SET_HALF",
                                half: 2,
                            })
                        }
                    >
                        Second half
                    </button>
                </div>

                <button
                    className="button button--danger"
                    onClick={() =>
                        dispatch({
                            type: "RESET_MATCH",
                            state: initialMatch,
                        })
                    }
                >
                    Reset match
                </button>
            </div>

            <TeamControls
                side="away"
                match={match}
                dispatch={dispatch}
            />
        </section>
    );
}