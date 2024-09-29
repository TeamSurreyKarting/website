'use server';

import { z } from "zod";
import { createServiceClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.enum(["indoor", "outdoor"]),
    name: z.string(),
    trackMapUploadPath: z.string(),
});

const CreateTrackSchema = FormSchema.omit({ id: true, createdAt: true, trackMapUploadPath: true });

export async function createTrack(formData: FormData) {
    // init supabase
    const supabase = createServiceClient();
    
    // TODO: Upload track map
    
    // Create track
    const type = formData.get("type") as string;
    const name = formData.get("name") as string;

    const newTrack = await supabase.from("Tracks").insert({
        type: type,
        name: name,
        // ...CreateTrackSchema.parse(formData),
    });

    // check for errors
    if (newTrack.error) {
        throw newTrack.error;
    }

    revalidatePath("/admin/tracks");
    redirect("/admin/tracks");
}
