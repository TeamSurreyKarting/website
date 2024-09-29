import { Enums } from "@/database.types";
import { createClient } from "@/app/utils/supabase/client";

export function allocatePoints(pointsAllocationMethod: string, position: number): number {
    switch (pointsAllocationMethod) {
        case "formula1_top10":
            return allocateF1Points(position);
        case "linear_top10":
            return allocateLinearPoints(position, 10);
        default:
            return 0;
    }
}

function allocateF1Points(position: number): number {
    switch (position) {
        case 1:
            return 25;
        case 2:
            return 18;
        case 3:
            return 15;
        case 4:
            return 12;
        case 5:
            return 10;
        case 6:
            return 8;
        case 7:
            return 6;
        case 8:
            return 4;
        case 9:
            return 2;
        case 10:
            return 1;
        default:
            return 0;
    }
}

function allocateLinearPoints(position: number, topN: number = 10): number {
    return (topN + 1) - position;
}

export type LeagueStanding = {
    racer: {
        id: number;
        name: string;
        exp_level: Enums<'experience_level'>;
    };
    points: number;
}

export async function fetchLeagueStandings(leagueId: number): Promise<LeagueStanding[]> {
    const supabase = createClient();

    // Get the league
    let { data: leagueData, error: leagueError } = await supabase
        .from('League')
        .select('id, name, points_allocation_method')
        .eq('id', leagueId)
        .single();
    
    // Error check
    if (leagueError) throw leagueError;
    if (!leagueData) throw new Error('League not found');

    // Initialise the overall standings
    let standings: Record<number, LeagueStanding> = {};

    // Get all race events for the league
    const { data: leagueEvents, error: eventError } = await supabase
        .from('RaceEvent')
        .select('id, format, League( id )')
        .eq('League.id', leagueId);

    // Error check
    if (eventError) throw eventError;

    // Optional safety check
    if (!leagueEvents) throw new Error('No events found for league');

    // Fetch the results from each event and calculate points
    // fixme: this is causing a heavy request load (inf loop)
    for (const event of leagueEvents) {
        // Ensure league id is present
        if (!event.League?.id) continue;

        // Fetch results for event
        let { data, error } = await supabase
            .rpc('get_fastest_laps', {
                for_event_id: event.id,
                for_league_id: event.League.id
            })
            .returns<{event_session_result_id: number, event_session_id: number, event_id: number, racer_id: number, fastest_lap: number, total_time: number, first_name: string, last_name: string, experience_level: Enums<'experience_level'> }[]>();
        
        // Guard clauses
        if (error) throw error;
        if (!data) continue;

        // Add points to standings
        data?.forEach((result, idx: number) => {
            // init racer if not in standings
            if (!standings[result.racer_id]) {
                standings[result.racer_id] = {
                    racer: {
                        id: result.racer_id,
                        name: `${result.first_name} ${result.last_name}`,
                        exp_level: result.experience_level
                    },
                    points: 0
                };
            }

            // add points
            const current_points = standings[result.racer_id].points ?? 0;
            standings[result.racer_id].points = current_points + allocatePoints(leagueData.points_allocation_method, idx + 1);
        });
    }

    // Sort standings
    const sortedStandings = Object.values(standings).sort((a, b) => b.points - a.points);

    // Return sorted standings
    return sortedStandings;
}

export async function fetchExperienceLevels(): Promise<string[]> {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('get_types', { enum_type: 'experience_level'}).returns<string[]>();
    
    if (error) throw error;

    return data;
}
