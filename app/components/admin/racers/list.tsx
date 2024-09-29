import { createAnonClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function RacerList({ filter }: { filter?: string }) {
    const supabase = createAnonClient();
    const { data: racers } = (!filter || filter === "")
        ?
        await supabase.from("Racers").select()
        :
        await supabase.from("Racers").select().ilike("full_name", `%${filter}%`);

    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                {
                    (racers === null || racers.length === 0) ? (
                        <p>No racers found.</p>
                    ) : (
                    racers?.map((racer) => (
                        <Link href={`/admin/racers/${racer.id}`} key={racer.id} className="bg-nile-blue-700 hover:bg-lightning-gold-300 hover:text-black p-4 rounded-xl">
                            <p className="text-lg">{racer.full_name}</p>
                        </Link>
                    )
                ))}
            </div>
        </>
    );
}
