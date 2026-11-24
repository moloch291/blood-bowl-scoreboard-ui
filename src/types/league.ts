export interface ConferenceTeam {
    team_logo: string;
    team_name: string;
    points: number;
    touchdowns: number;
    casualties: number;
    games_played: number;
    wins: number | null;
    losses: number | null;
    draws: number | null;
}

export interface ConferenceStandings {
    greatOcean: ConferenceTeam[];
    oldWorld: ConferenceTeam[];
}

export type ConferenceKey =
    | "great-ocean"
    | "old-world";

export type GameOutcome =
    | "win"
    | "loss"
    | "draw";

export interface GameResultInput {
    teamName: string;
    points: number;
    touchdowns: number;
    casualties: number;
    outcome: GameOutcome;
}
