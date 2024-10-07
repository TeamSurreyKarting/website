'use server';

import { z } from "zod";
import { createServiceClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.string(),
    studentIdExpiry: z.date(),
    experienceLevel: z.enum(["rookie", "experienced", "graduate"]),
});

const CreateRaceSchema = FormSchema.omit({ id: true, userId: true, createdAt: true });

export async function createRacer(formData: FormData) {
    // init supabase
    const supabase = createServiceClient();

    const email = formData.get("email") as string;

    // Determine if user already exists
    const { data: userExistsQueryResult, error: userExistsQueryError } = await supabase.rpc('racer_exists', { user_email: email });
    if (userExistsQueryError) throw userExistsQueryError;
    const userExists = userExistsQueryResult;

    var userId = null;

    if (!userExists) {
        
        // Create user in supabase and send invite email
        const { data, error } = await supabase.auth.admin.createUser({
            email: email,
            email_confirm: true,
        });

        // check for errors
        if (error) {
            throw error;
        }

        // check that data is not null
        if (!data) {
            throw new Error("No data returned from createUser");
        }

        userId = data.user.id;
    } else {
        // Fetch user from supabase based on email
        const { data: userQueryResult, error: userQueryError } = await supabase.schema("auth").from("Users").select("id").eq("email", email).single();
        if (userQueryError) throw userQueryError;
        userId = userQueryResult.id;
    }

    if (!userId) {
        throw new Error("No user ID found. This should not happen.");
    }

    // Create racer in database
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const studentIdExpiry = formData.get("studentIdExpiry") as string;
    const experienceLevel = formData.get("experienceLevel") as string;

    const studentIdExpiryDate = new Date(studentIdExpiry);

    const newRacer = await supabase.from("Racers").insert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        student_id_expiry: studentIdExpiryDate,
        experience_level: experienceLevel
        // ...CreateRaceSchema.parse(formData),
    });

    // check for errors
    if (newRacer.error) {
        throw newRacer.error;
    }

    revalidatePath("/admin/racers");
    redirect("/admin/racers");
}
