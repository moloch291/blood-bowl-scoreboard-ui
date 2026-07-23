import type { Team } from "./team";

export type TeamSide = "home" | "away";

export interface TeamMatchState {
    team: Team;
    score: number;
    turn: number;
    rerolls: number;
}

export interface MatchState {
    home: TeamMatchState;
    away: TeamMatchState;
    half: 1 | 2;
}