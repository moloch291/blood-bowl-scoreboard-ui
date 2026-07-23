import type { MatchState } from "../types/match";
import type { Team } from "../types/team";

export function createInitialMatchState(
    homeTeam: Team,
    awayTeam: Team,
    homeRerolls: number,
    awayRerolls: number,
): MatchState {
    return {
        home: {
            team: homeTeam,
            score: 0,
            turn: 0,
            rerolls: Math.max(0, homeRerolls),
            hasFinishedHalf: false,
        },

        away: {
            team: awayTeam,
            score: 0,
            turn: 0,
            rerolls: Math.max(0, awayRerolls),
            hasFinishedHalf: false,
        },

        half: 1,
    };
}