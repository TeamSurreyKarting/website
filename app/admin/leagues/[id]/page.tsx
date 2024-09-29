import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import LeagueEventSeriesList from "@/app/components/admin/leagues/event-series-list";
import LeagueEntrantList from "@/app/components/admin/leagues/league-entrant-list";
import { createAnonClient } from "@/app/utils/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LeagueStandings from "@/app/components/league/LeagueStandings";
import AddLeagueEntrant from "@/app/components/admin/leagues/add-league-entrant-button-modal";
import AddEventSeries from "@/app/components/admin/leagues/add-league-race-event-button-modal";

export default async function Page({ params }: { params: { id: number } }) {
    const id = params.id;

    const supabase = createAnonClient();
    const league = await supabase.from("League").select().eq("id", id).single();

    if (!league) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Leagues", href: "/admin/leagues" },
        { label: league.data?.name || "", href: `/admin/leagues/${id}`, active: true },
    ];

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <div className="flex mb-2 items-center">
                <h2 className="text-xl mb-2">Event Series</h2>
                <div className="flex-grow" />
                <AddEventSeries leagueId={id} />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueEventSeriesList leagueId={id} />
            </Suspense>
            <hr className="my-6" />
            <div className="flex mb-2 items-center">
                <h2 className="text-xl mb-2">Entrants</h2>
                <div className="flex-grow" />
                <AddLeagueEntrant leagueId={id} />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueEntrantList leagueId={id} />
            </Suspense>
            <hr className="my-6" />
            <h2 className="text-xl mb-2">Table</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueStandings leagueId={id} />
            </Suspense>
        </>
    );
}
