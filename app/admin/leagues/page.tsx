import LeagueList from "@/app/components/admin/leagues/list";
import LeagueFilter from "@/app/components/admin/leagues/filter";
import Link from "next/link";

export default function Page({ params }: { params: { id: number } }) {
    const leagueId = params.id;

    return (
        <>
            <div className="flex">
                <h1 className="text-2xl flex-1">Leagues</h1>
                <Link href="/admin/leagues/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    Create League
                </Link>
            </div>
            <hr className="my-6" />
            <LeagueFilter />
            <LeagueList />
        </>
    );
}
