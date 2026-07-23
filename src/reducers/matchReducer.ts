import type { MatchState, TeamSide } from "../types/match";

export type MatchAction =
    | {
        type: "ADD_SCORE";
        side: TeamSide;
    }
    | {
        type: "REMOVE_SCORE";
        side: TeamSide;
    }
    | {
        type: "NEXT_TURN";
        side: TeamSide;
    }
    | {
        type: "PREVIOUS_TURN";
        side: TeamSide;
    }
    | {
        type: "USE_REROLL";
        side: TeamSide;
    }
    | {
        type: "RESTORE_REROLL";
        side: TeamSide;
    }
    | {
        type: "SET_HALF";
        half: 1 | 2;
    }
    | {
        type: "RESET_MATCH";
        state: MatchState;
    };

export function matchReducer(
    state: MatchState,
    action: MatchAction,
): MatchState {
    switch (action.type) {
        case "ADD_SCORE":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    score: state[action.side].score + 1,
                },
            };

        case "REMOVE_SCORE":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    score: Math.max(0, state[action.side].score - 1),
                },
            };

        case "NEXT_TURN":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    turn: Math.min(8, state[action.side].turn + 1),
                },
            };

        case "PREVIOUS_TURN":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    turn: Math.max(0, state[action.side].turn - 1),
                },
            };

        case "USE_REROLL":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    rerolls: Math.max(
                        0,
                        state[action.side].rerolls - 1,
                    ),
                },
            };

        case "RESTORE_REROLL":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    rerolls: state[action.side].rerolls + 1,
                },
            };

        case "SET_HALF":
            return {
                ...state,
                half: action.half,
            };

        case "RESET_MATCH":
            return action.state;

        default:
            return state;
    }
}