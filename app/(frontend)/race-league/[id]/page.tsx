'use server';

import { createAnonClient } from '@/app/utils/supabase/server';
import { Tables, Enums } from "@/database.types";
import Link from "next/link";
import LeagueStandings from "@/app/components/league/LeagueStandings";
import { data, label } from 'framer-motion/client';
import { fetchExperienceLevels, fetchLeagueStandings } from '@/app/utils/league/functions';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

export default async function Page({ params, searchParams }: { params: { id: number }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const leagueId = params.id;

    const supabase = createAnonClient();

    // Get the league
    let { data: leagueData, error: leagueError } = await supabase.from('League').select('id, name, points_allocation_method').eq('id', params.id).single();

    // Safety check
    if (leagueError) throw leagueError;
    if (data === null) return <div>League not found</div>;

    // Get experience levels and league standings
    const experienceLevels = await fetchExperienceLevels();
    const leagueStandings = await fetchLeagueStandings(leagueId);

    // Set breadcrumbs
    const breadcrumbs = [
        { label: 'Race Leagues', href: '/race-league' },
        { label: leagueData?.name ?? '', href: `/race-league/${leagueId}`, active: true }
    ];

    return (
        <div className={"p-5 w-full md:w-[70%] mx-auto rounded-lg"}>
            {/* <h2 className={'text-2xl font-extrabold mb-5'}>{leagueData?.name}</h2> */}
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {/* todo: show results for each round as well as for whole league */}
            {/* <div className={'grid grid-cols-1 lg:grid-cols-[30%_auto] gap-8 mr-4'}> */}
                {/* <div id={'events'} className={'flex flex-col gap-2'}>
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
                </div> */}
            {/* </div> */}
            <LeagueStandings leagueId={leagueId} experienceLevels={experienceLevels} leagueStandings={leagueStandings} />
        </div>
    );
}