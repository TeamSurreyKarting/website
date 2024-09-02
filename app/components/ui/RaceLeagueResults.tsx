import { createClient } from '@/app/utils/supabase/server';

export default async function RaceLeagueResults() {
    const supabase = createClient();

    const timestampNow = new Date().toISOString();
    let { data: leagueData, error } = await supabase
        .from('League')
        .select('id, name')
        .gte('end_date', timestampNow)
        .order('start_date', { ascending: false });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-nile-blue-950/30 p-5 w-full md:w-[70%] mx-auto rounded-lg">
            <h2 className="text-2xl font-extrabold text-nile-blue-100 text-center mb-5">Race Leagues</h2>
            <div id="race-leagues" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leagueData === null ? (
                    <div>No leagues found</div>
                ) : (
                    leagueData.map((league) => (
                        <div key={league.id} className="flex items-center bg-nile-blue-200 p-3 rounded-md shadow-sm mb-2">
                            <a href={`/league/${league.id}`}>
                                <h3 className="text-lg font-semibold">{league.name}</h3>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
