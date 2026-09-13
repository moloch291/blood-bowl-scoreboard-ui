import type {
    ConferenceKey,
    ConferenceStandings,
    ConferenceTeam,
    GameResultInput,
} from "../types/league";

export async function getConferenceStandings():
    Promise<ConferenceStandings> {
    const response = await fetch(
        "/api/conferences",
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load conference standings",
        );
    }

    return response.json();
}

export async function addConferenceResult(
    conference: ConferenceKey,
    result: GameResultInput,
): Promise<ConferenceTeam> {
    const response = await fetch(
        `/api/conferences/${conference}/results`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(result),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Failed to add game result",
        );
    }

    return response.json();
}
