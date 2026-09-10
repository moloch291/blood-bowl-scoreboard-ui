import type { Team } from "./team";

export type TeamSide = "home" | "away";
export type GameMode = "7s" | "11s";

export interface TeamMatchState {
    team: Team;
    score: number;
    turn: number;
    rerolls: number;
    hasFinishedHalf: boolean;
}

export interface MatchState {
    home: TeamMatchState;
    away: TeamMatchState;
    half: 1 | 2;
    gameMode: GameMode;
}