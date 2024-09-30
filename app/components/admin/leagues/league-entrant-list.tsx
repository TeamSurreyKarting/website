import { createAnonClient } from "@/app/utils/supabase/server";
import clsx from "clsx";

export default async function LeagueEntrantList({ leagueId }: { leagueId: number }) {
    const supabase = await createAnonClient();

    const { data, error } = await supabase
        .from("LeagueEntrant")
        .select(`id, Racers ( id, first_name, last_name, experience_level ), League ( id, name )`)
        .eq("league_id", leagueId);

    if (error) {
        throw error;
    }

    if (data.length === 0) {
        return (
            <div className="text-center bg-nile-blue-700 rounded-md p-2">
                <p>No entrants</p>
            </div>
        )
    }

    return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((entrant) => {
                    const xp_lvl_titlecase = entrant.Racers?.experience_level.replace(
                        /\w\S*/g,
                        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
                      );
                    
                    return (
                        <div key={entrant.id} 
                            className="p-4 rounded-md flex justify-between items-center bg-nile-blue-700 text-white"
                            >
                            <h3 className="font-bold">{`${entrant.Racers?.first_name} ${entrant.Racers?.last_name}`}</h3>
                            <p>{xp_lvl_titlecase}</p>
                        </div>
                    );
                })}
            </div>
    );

}