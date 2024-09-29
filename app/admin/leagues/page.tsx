import LeagueList from "@/app/components/admin/leagues/list";
import LeagueFilter from "@/app/components/admin/leagues/filter";
import Link from "next/link";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: number } }) {
    const leagueId = params.id;
    const breadcrumbs = [
        { label: "Leagues", href: "/admin/leagues", active: true },
    ]

    return (
        <>
            <div className="flex items-center">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex-grow"></div>
                <Link href="/admin/leagues/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    Create League
                </Link>
            </div>
            <hr className="my-6" />
            {/* <LeagueFilter /> */}
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueList />
            </Suspense>
        </>
    );
}
