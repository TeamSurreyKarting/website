'use server';

import { createAnonClient } from '@/app/utils/supabase/server';
import Link from "next/link";

export default async function RaceLeagueResults() {
    const supabase = createAnonClient();

    let { data: leagueData, error } = await supabase
        .from('League')
        .select('id, name');

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
            <div id="race-leagues" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    leagueData?.map((league) => (
                        <div key={league.id} className="flex items-center bg-lightning-gold-600 hover:bg-lightning-gold-500 p-3 rounded-md shadow-sm mb-2">
                            <Link href={`/race-league/${league.id}`} className="text-lg font-semibold">
                                {league.name}
                            </Link>
                        </div>
                    ))
                }
            </div>
    );
}