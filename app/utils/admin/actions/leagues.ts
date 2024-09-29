'use server';

import { z } from "zod";
import { createServiceClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    racerId: z.string(),
    eventSessionId: z.string(),
    fastestLap: z.number().optional(),
    totalTime: z.number().optional(),
});

const CreateRaceEventResultSchema = FormSchema.omit({ id: true, createdAt: true });

export async function addRaceEventResult(formData: FormData) {
    // init supabase
    const supabase = createServiceClient();

    console.log(formData)
    
    // insert into db
    const racerId = formData.get("racer") as string;
    const eventSessionId = formData.get("eventSessionId") as string;
    const fastestLap = formData.get("fastestLap") as number | null; 
    const totalTime = formData.get("totalTime") as number | null;

    console.log(racerId, eventSessionId, fastestLap, totalTime);
    
    const newRacer = await supabase.from("RaceEventSessionResult").insert({
        racer_id: racerId,
        event_session_id: eventSessionId,
        fastest_lap: fastestLap,
        total_time: totalTime,
    });

    // check for errors
    if (newRacer.error) {
        console.log(newRacer.error);
        throw newRacer.error;
    }

    revalidatePath("/admin/racers");
    redirect("/admin/racers");
}

export async function addLeagueEntrant(formData: FormData) {
    // init supabase
    const supabase = createServiceClient();

    // insert into db
    const racerId = formData.get("racer") as string;
    const leagueId = formData.get("leagueId") as string;

    const { data, error } = await supabase.from("LeagueEntrant").insert({
        racer_id: racerId,
        league_id: leagueId,
    });

    console.log(data, error);

    // check for errors
    if (error) {
        console.log(error);
        throw error;
    }

    revalidatePath(`/admin/leagues/${leagueId}`);
    redirect(`/admin/leagues/${leagueId}`);
}
