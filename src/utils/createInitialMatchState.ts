import type {
    GameMode,
    MatchState,
    Weather,
} from "../types/match";
import type { Team } from "../types/team";

export function createInitialMatchState(
    homeTeam: Team,
    awayTeam: Team,
    homeRerolls: number,
    awayRerolls: number,
    gameMode: GameMode,
    weather: Weather,
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
        gameMode,
        weather,
    };
}