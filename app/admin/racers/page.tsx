import RacerList from "@/app/components/admin/racers/list";
import Search from "@/app/components/ui/Search";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="flex">
                <h1 className="text-2xl flex-1">Racers</h1>
                <Link href="/admin/racers/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    New Racer
                </Link>
            </div>
            <hr className="my-6" />
            <Search placeholder="Search Racers..." />
            <RacerList />
        </>
    );
}
