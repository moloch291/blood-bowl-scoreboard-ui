import type {
    MatchState,
    TeamSide,
} from "../types/match";

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
        type: "START_SECOND_HALF";
        rerolls: {
            home: number;
            away: number;
        };
    }
    | {
        type: "RESET_MATCH";
        state: MatchState;
    }
    | {
        type: "FINISH_HALF";
        side: TeamSide;
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
                    score: Math.max(
                        0,
                        state[action.side].score - 1,
                    ),
                },
            };

        case "NEXT_TURN":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    turn: Math.min(
                        8,
                        state[action.side].turn + 1,
                    ),
                },
            };

        case "PREVIOUS_TURN":
            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    turn: Math.max(
                        0,
                        state[action.side].turn - 1,
                    ),
                    hasFinishedHalf: false,
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
                    rerolls:
                        state[action.side].rerolls + 1,
                },
            };

        case "START_SECOND_HALF":
            return {
                ...state,
                half: 2,

                home: {
                    ...state.home,
                    turn: 0,
                    rerolls: action.rerolls.home,
                    hasFinishedHalf: false,
                },

                away: {
                    ...state.away,
                    turn: 0,
                    rerolls: action.rerolls.away,
                    hasFinishedHalf: false,
                },
            };

        case "FINISH_HALF":
            if (state[action.side].turn !== 8) {
                return state;
            }

            return {
                ...state,
                [action.side]: {
                    ...state[action.side],
                    hasFinishedHalf: true,
                },
            };

        case "RESET_MATCH":
            return action.state;

        default:
            return state;
    }
}