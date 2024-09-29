'use client';

import { createClient } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";
import { Database } from "@/database.types";
import clsx from "clsx";
import Link from "next/link";
import AddRaceLeagueEventSession from "./add-league-race-event-session-button-modal";

type RaceEventSessionResultWithRacer = {
    id: any;
    Racers: {
        id: any;
        first_name: any;
        last_name: any;
    };
    event_session_id: any;
    fastest_lap: any;
    total_time: any;
}

export default function DetailsResultsTable({ leagueId, raceEventId }: { leagueId: number, raceEventId: number }) {
    const supabase = createClient();
    const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
    const [activeSessionResultsData, setActiveSessionResultsData] = useState<RaceEventSessionResultWithRacer[] | null>(null);
    const [raceEventSessionData, setRaceEventSessionData] = useState<Database["public"]["Tables"]["RaceEventSession"]["Row"][] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  

    // Fetch race event session data
    useEffect(() => {
        const fetchRaceEventSessionData = async () => {
            try {
                const { data, error } = await supabase.from("RaceEventSession").select().eq("race_event_id", raceEventId);

                if (error) throw error;
                setRaceEventSessionData(data);

                // Set active session id to the first session in the list
                setActiveSessionId(data[0]?.id ?? null); 
            } catch (error) {
                console.error("Error fetching race event session data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchRaceEventSessionData();
    }, [raceEventId]);

    // Fetch active session results when activeSessionId changes
    useEffect(() => {
        if (!activeSessionId) return;

        const fetchSessionResults = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from("RaceEventSessionResult").select(`id, Racers ( id, first_name, last_name ), event_session_id, fastest_lap, total_time `).eq("event_session_id", activeSessionId).order("fastest_lap").returns<RaceEventSessionResultWithRacer[]>();

                if (error) throw error;
                setActiveSessionResultsData(data);
            } catch (error) {
                console.error("Error fetching session results:", error);
                setActiveSessionResultsData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionResults();
    }, [activeSessionId]);

    // Render logic for race event sessions
    return (
        <>
            <div className="flex flex-row gap-2">
                {raceEventSessionData?.map((session, idx) => (
                    <button
                        key={idx}
                        className={clsx(
                            "text-nowrap px-4 py-2 rounded-md",
                            {
                                "bg-lightning-gold-400 text-black": activeSessionId === session.id,
                                "bg-nile-blue-600": activeSessionId !== session.id,
                            }
                        )}
                        onClick={() => setActiveSessionId(session.id)}
                    >
                        Session {idx + 1}
                    </button>
                ))}
                <div className="flex-grow"></div>
                <AddRaceLeagueEventSession leagueId={leagueId} raceEventId={raceEventId} />
            </div>
            <div className="bg-nile-blue-900 rounded-lg mt-2 p-4">
                {loading && loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium">Results</h3>
                            {activeSessionId && raceEventSessionData ? (
                                <>
                                    <p>Session Start: {formatDateString(raceEventSessionData.find((el) => el.id === activeSessionId)?.session_start ?? '')}</p>
                                    <p>Session End: {formatDateString(raceEventSessionData.find((el) => el.id === activeSessionId)?.session_end ?? '')}</p>
                                </>
                            ) : (
                                <p>No session selected</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            {activeSessionId && activeSessionResultsData ? (
                                activeSessionResultsData.map((result, idx) => (
                                    <div className="bg-nile-blue-500 px-2 py-1 rounded-md" key={idx}>
                                        {result.Racers?.first_name} {result.Racers?.last_name} - {result.fastest_lap}
                                    </div>
                                ))
                            ) : (
                                <p>No results found for this session.</p>
                            )}
                            {activeSessionId && activeSessionResultsData && (
                                <Link href={`/admin/leagues/${leagueId}/results/${raceEventId}/add/${activeSessionId}`} className="bg-lightning-gold-400 text-black w-fit px-2 py-1 rounded-md">
                                    Add Results
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

function formatDateString(dateString: string) {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()} ${date.toLocaleDateString()}`;
}