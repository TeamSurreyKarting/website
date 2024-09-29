import { createAnonClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function RacerList() {
    const sb = createAnonClient();
    const { data: racers } = await sb.from("Racers").select();

    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                {
                racers?.map((racer) => (
                    <Link href={`/admin/racers/${racer.id}`} key={racer.id} className="bg-nile-blue-700 hover:bg-lightning-gold-300 hover:text-black p-4 rounded-xl">
                        <p className="text-lg">{racer.first_name} {racer.last_name}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}
