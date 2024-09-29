import TrackList from "@/app/components/admin/tracks/list";
import Search from "@/app/components/ui/Search";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="flex">
                <h1 className="text-2xl flex-1">Tracks</h1>
                <Link href="/admin/tracks/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    New Track
                </Link>
            </div>
            <hr className="my-6" />
            <Search placeholder="Search Tracks..." />
            <TrackList />
        </>
    );
}
