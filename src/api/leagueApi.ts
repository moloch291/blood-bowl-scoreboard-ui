import type {
    ConferenceStandings,
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