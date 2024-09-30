import DetailsResultsTable from "@/app/components/admin/leagues/event-details-results-table";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { createAnonClient } from "@/app/utils/supabase/server";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: number, event_id: number } }) {
    const leagueId = params.id;
    const eventId = params.event_id;

    const supabase = createAnonClient();
    const { data: leagueData, error: leagueError } = await supabase.from("League").select().eq("id", leagueId).single();

    if (leagueError) throw leagueError;
    if (!leagueData) return <div>League for Event not found</div>;

    const { data: eventData, error: eventError } = await supabase.from("RaceEvent").select().eq("id", eventId).single();

    if (eventError) throw eventError;
    if (!eventData) return <div>Event not found</div>;

    const breadcrumbs = [
        { label: "Leagues", href: "/admin/leagues" },
        { label: leagueData?.name || "", href: `/admin/leagues/${leagueId}` },
        { label: "Race Event", href: `/admin/leagues/${leagueId}/results`, active: true },
    ];
    
    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Suspense fallback={<div>Loading...</div>}>
                <DetailsResultsTable leagueId={leagueId} raceEventId={eventId} />
            </Suspense>
        </>
    );
}
``