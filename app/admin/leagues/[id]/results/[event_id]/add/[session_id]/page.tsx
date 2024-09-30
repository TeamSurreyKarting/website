import RaceEventResultsForm from "@/app/components/admin/leagues/results-form";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs"
import { createAnonClient } from "@/app/utils/supabase/server";

export default async function Page({ params }: { params: { id: number, event_id: number, session_id: number } }) {
    const leagueId = params.id;
    const eventId = params.event_id;
    const sessionId = params.session_id;

    const supabase = createAnonClient();
    const { data: leagueData, error: leagueError } = await supabase.from("League").select().eq("id", leagueId).single();

    if (leagueError) throw leagueError;
    if (!leagueData) return <div>League for session not found</div>;

    const { data: eventData, error: eventError } = await supabase.from("RaceEvent").select('id, Tracks ( id,  name )').eq("id", eventId).single();

    if (eventError) throw eventError;
    if (!eventData) return <div>Event for session not found</div>;

    const { data: sessionData, error: sessionError } = await supabase.from("RaceEventSession").select().eq("id", sessionId).single();

    if (sessionError) throw sessionError;
    if (!sessionData) return <div>Session not found</div>;
    
    const breadcrumbs = [
        { label: "Leagues", href: "/admin/leagues" },
        { label: leagueData?.name || "", href: `/admin/leagues/${leagueId}` },
        { label: "Race Event", href: `/admin/leagues/${leagueId}/results/${eventId}` },
        { label: "Add Results", href: `/admin/leagues/${leagueId}/results/${eventId}/add/${sessionId}`, active: true },
    ]

    const sessionTrackName = eventData.Tracks?.name || "Unknown Track";
    const sessionStart = new Date(sessionData?.session_start ?? "");
    const sessionEnd = new Date(sessionData?.session_end ?? "");

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="text-xl">Race Event at {sessionTrackName}</h2>
            <p>{sessionStart.toDateString()} {sessionStart.toLocaleTimeString()} - {sessionEnd.toLocaleTimeString()}</p>
            <RaceEventResultsForm sessionId={sessionId} />
        </>
    );
}
