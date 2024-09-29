import { createAnonClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function TrackList() {
    const sb = createAnonClient();
    const { data: tracks } = await sb.from("Tracks").select();

    return (
        <>
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {
                tracks?.map((track) => (
                    <Link key={track.id} href={`/admin/tracks/${track.id}`}>
                        <div className="bg-nile-blue-800 hover:bg-lightning-gold-300 hover:text-black border-solid border-nile-blue-950 hover:border-lightning-gold-300 border-2 rounded-xl overflow-hidden">
                                <div className="min-h-48 p-4 bg-nile-blue-900">
                                    <p className="text-white/20">Track Preview</p>
                                </div>
                                <div className="p-4">
                                    <p className="text-lg">{track.name}</p>
                                </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
