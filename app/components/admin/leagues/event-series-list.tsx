import { createAnonClient } from "@/app/utils/supabase/server";
import clsx from "clsx";
import Link from "next/link";

export default async function LeagueEventSeriesList({ leagueId }: { leagueId: number }) {
    const supabase = await createAnonClient();

    const { data, error } = await supabase
        .from("RaceEvent")
        .select(`id, arrival_time, Tracks ( id, name )`)
        .eq("league_id", leagueId)
        .order("arrival_time");

    if (error) {
        throw error;
    }

    if (data.length === 0) {
        return (
            <div className="text-center bg-nile-blue-700 rounded-md p-2">
                <p>No events</p>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4 my-4">
                {
                    data.map((event) => {
                        // Determine if event is in the past
                        const arrivalTime = new Date(event.arrival_time ?? '');
                        const isPast = arrivalTime < new Date();
                        
                        return (
                            <div key={event.id} 
                                className={clsx(
                                    "p-4 rounded-md flex justify-between items-center",
                                    {
                                        "text-black bg-lightning-gold-400": !isPast,
                                        "text-white bg-nile-blue-700": isPast,
                                    }
                                )}
                                >
                                <div>
                                    <h3 className="font-bold">{event.Tracks?.name}</h3>
                                    <p>{arrivalTime.toDateString()}</p>
                                </div>
                                {isPast && (
                                    <div>
                                        <Link href={`/admin/leagues/${leagueId}/results/${event.id}`} className="bg-lightning-gold-500 text-black p-2 rounded-md font-medium">Event Details</Link>
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}
