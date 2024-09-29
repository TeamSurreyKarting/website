'use server';

import { createAnonClient } from '@/app/utils/supabase/server';
import { Tables, Enums } from "@/database.types";
import Link from "next/link";
import LeagueStandings from "@/app/components/league/LeagueStandings";
import { allocatePoints } from "@/app/utils/league/functions";
import { data } from 'framer-motion/client';

export default async function Page({ params, searchParams }: { params: { id: number }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const leagueId = params.id;

    const supabase = createAnonClient();

    // Get the league
    let { data: leagueData, error: leagueError } = await supabase.from('League').select('id, name, points_allocation_method').eq('id', params.id).single();

    // Safety check
    if (leagueError) throw leagueError;
    if (data === null) return <div>League not found</div>;

    // Get all race events for the league
    const { data: leagueEvents, error: eventsError } = await supabase.from('RaceEvent').select('id, format, League(id)').eq('League.id', params.id).returns<Tables<'RaceEvent'>[]>();

    // Safety check
    if (eventsError) throw eventsError;

    return (
        <div className={"bg-nile-blue-950/30 p-5 w-full md:w-[70%] text-nile-blue-100 mx-auto rounded-lg"}>
            <h2 className={'text-2xl font-extrabold text-center mb-5'}>{leagueData?.name}</h2>
            <div className={'grid grid-cols-1 lg:grid-cols-[30%_auto] gap-8 mr-4'}>
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
                <LeagueStandings leagueId={leagueId}/>
            </div>
        </div>
    );
}