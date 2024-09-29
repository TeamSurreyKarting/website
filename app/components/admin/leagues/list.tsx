import { createAnonClient } from "@/app/utils/supabase/server";
import { Database } from "@/database.types";
import Link from "next/link";

export default async function LeagueList() {
    const sb = createAnonClient();
    const { data: leagues } = await sb.from("League").select();

    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                { leagues?.map((league) => leagueCard(league)) }
            </div>
        </>
    );
}

function leagueCard(league: {
    created_at: string;
    end_date: string | null;
    id: number;
    name: string | null;
    points_allocation_method: Database["public"]["Enums"]["points_allocations"];
    start_date: string | null;
}) {

    return (
        <div key={league.id} className="bg-nile-blue-700 hover:bg-lightning-gold-300 hover:text-black p-4 rounded-xl">
            <Link href={`/admin/leagues/${league.id}`}>
                <p className="text-lg">{league.name}</p>
            </Link>
        </div>
    )
}
