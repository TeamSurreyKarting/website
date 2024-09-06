'use server';

import { createClient } from '@/app/utils/supabase/server';
import { Tables, Enums } from "@/database.types";
import Link from "next/link";
import LeagueStandings from "@/app/components/league/LeagueStandings";

function calculatePoints(pointsAllocationMethod: string, position: number) {
    switch (pointsAllocationMethod) {
        case "formula1_top10":
            return calculateF1Points(position);
        case "linear_top10":
            return calculateLinearPoints(position, 10);
        default:
            return 0;
    }
}

function calculateF1Points(position: number) {
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

function calculateLinearPoints(position: number, topN: number = 10) {
    return (topN + 1) - position;
}

export default async function Page({ params, searchParams }: { params: { id: number }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const supabase = createClient();

    // Get the league
    let { data: leagueData }: { data: Tables<'League'> } = await supabase.from('League').select('id, name, points_allocation_method').eq('id', params.id).single().returns<Tables<'League'>>();

    // Initialise the overall standings
    // let standings: { racer_id: number, racer_name: string, racer_points: 0,  } = {}; // racer_id, points
    let standings: Record<number, { id: number, name: string, exp_level: Enums<'experience_level'>, points: number}> = {};

    // Get all race events for the league
    const { data: leagueEvents, error } = await supabase.from('RaceEvent').select('id, format, League(id)').eq('League.id', params.id).returns<Tables<'RaceEvent'>[]>();

    // Fetch the results from each event and calculate points
    for (const event of leagueEvents) {
        // todo: Determine if event contributes to current view
        // if (searchParams.view !== 'overall' || parseInt(searchParams.event_id[0] ?? (searchParams.event_id ??  '')) !== event.id) {
        //     console.log(`Skipping event ${event.id} as it is not the current view`);
        //     continue;
        // }

        // Fetch results for event
        let { data, error } = await supabase
            .rpc('get_fastest_laps', {
                for_event_id: event.id,
                for_league_id: event.League.id
            })
            .returns<{event_session_result_id: number, event_session_id: number, event_id: number, racer_id: number, fastest_lap: number, total_time: number, first_name: string, last_name: string, experience_level: Enums<'experience_level'> }[]>();
        if (error) throw error;

        // Add points to standings
        data.forEach((result: { racer_id: number, fastest_lap: number, first_name: string, last_name: string }, idx: number) => {
            // init racer if not in standings
            if (!standings[result.racer_id]) {
                standings[result.racer_id] = {
                    id: result.racer_id,
                    name: `${result.first_name} ${result.last_name}`,
                    exp_level: result.experience_level,
                    points: 0
                };
            }

            // add points
            const current_points = standings[result.racer_id].points ?? 0;
            standings[result.racer_id].points = current_points + calculatePoints(leagueData.points_allocation_method, idx + 1);
        });
    }

    return (
        <div className={"bg-nile-blue-950/30 p-5 w-full md:w-[70%] text-nile-blue-100 mx-auto rounded-lg"}>
            <h2 className={'text-2xl font-extrabold text-center mb-5'}>Race League: {leagueData.name}</h2>
            <div className={'grid grid-cols-[30%_auto] gap-8 mr-4'}>
                <div id={'events'} className={'flex flex-col gap-2'}>
                    <Link href={'?view=overall'}
                          className={'bg-lightning-gold-400 text-black/80 rounded-md py-2 px-4 hover:bg-lightning-gold-500 duration-75'}>
                        Overall
                    </Link>
                    <hr className={'border-lightning-gold-500'}/>
                    {
                        leagueEvents?.map((event) => (
                            <Link key={event.id} href={`?view=event&event_id=${event.id}`}
                                  className={'bg-nile-blue-600 rounded-md py-2 px-4 hover:bg-nile-blue-700 duration-75'}>
                                Event {event.id}
                            </Link>
                        ))
                    }
                </div>
                <LeagueStandings standings={standings}/>
            </div>
        </div>
    );
}