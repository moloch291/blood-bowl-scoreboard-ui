import {
    useEffect,
    useState,
} from "react";

import leagueLogo from "../../assets/league-logo.png";
import greatOceanLogo from "../../assets/goc-logo.png";
import oldWorldLogo from "../../assets/owc-logo.png";
import { getConferenceStandings } from "../../api/leagueApi";

import type {
    ConferenceStandings,
} from "../../types/league";

import { ConferenceTable } from "./ConferenceTable";

import "./league.css";

interface LeagueProps {
    onBack: () => void;
}

export function League({
    onBack,
}: LeagueProps) {
    const [
        standings,
        setStandings,
    ] = useState<ConferenceStandings | null>(
        null,
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    useEffect(() => {
        async function loadStandings() {
            try {
                const data =
                    await getConferenceStandings();

                setStandings(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to load league standings.",
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadStandings();
    }, []);

    return (
        <main className="league">
            <header className="league__header">
                <button
                    type="button"
                    className="button button--secondary league__back"
                    onClick={onBack}
                >
                    Back to Main Menu
                </button>

                <img
                    className="league__logo"
                    src={leagueLogo}
                    alt="League"
                />

                <div className="league__header-spacer" />
            </header>

            {isLoading && (
                <div className="league__status">
                    Loading standings...
                </div>
            )}

            {error && (
                <div className="league__status league__status--error">
                    {error}
                </div>
            )}

            {standings && (
                <section className="league__conferences">
                    <ConferenceTable
                        title="Great Ocean Conference"
                        logo={greatOceanLogo}
                        teams={standings.greatOcean}
                    />

                    <ConferenceTable
                        title="Old World Conference"
                        logo={oldWorldLogo}
                        teams={standings.oldWorld}
                    />
                </section>
            )}
        </main>
    );
}