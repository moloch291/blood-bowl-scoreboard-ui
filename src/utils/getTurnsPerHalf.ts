import type { GameMode } from "../types/match";

export function getTurnsPerHalf(
    gameMode: GameMode,
): number {
    return gameMode === "7s" ? 6 : 8;
}