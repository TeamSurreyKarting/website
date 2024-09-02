'use client';

import { createClient } from '@/app/utils/supabase/server';
import { useRouter } from 'next/router';

function getSessionResults(sessionId: bigint) {
    // Get the race session results
    let { results, resultsError } = await supabase
        .from('RaceEventSessionResult')
        .select(`
            racer_id,
            fastest_lap,
            total_time,
            RaceEventSession(
                id,
                session_start,
                session_end,
                format,
                RaceEvent(
                    League(
                        id
                    ),
                    Track(
                        name
                    )
                )
            )
        `)
        .eq('RaceEventSession.id', sessionId);

    if (resultsError) {
}

export default async function Page() {
    // Obtain the ID
    const router = useRouter();
    const { id } = router.query;

    const supabase = createClient();

    // Get the league
    let { league, leagueError } = await supabase
        .from('League')
        .select('name, points_allocation_method, start_date, end_date')
        .eq('id', id)
        .single();

    if (leagueError) {
        // todo: raise error
    }
}

    // Get the race sessions for the league
    let { sessions, sessionsError } = supabase
        .from('RaceEvent')
        .select(`
            id,
            arrival_time,
            League(
                id
            ),
            Track(
                name
            )
        `)
        .eq('League.id', id);

    if (sessionsError) {
        // todo: raise error
    }

    return (
        <div id={'league-standings'}>
            <div id={'league-events'}>
                {sessions.map((session) => (
                    <div className="flex items-center bg-nile-blue-200 p-3 rounded-md shadow-sm mb-2">
                        <h3>{
                            // todo: arrival_time from timestamp to dd/mm/yy
                        }</h3>
                        <span>{session.track.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}