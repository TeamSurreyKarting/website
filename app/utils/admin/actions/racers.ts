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
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    
    // Create user in supabase and send invite email
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: {
            first_name: firstName,
            last_name: lastName
        },
        redirectTo: "/"
    });

    // check for errors
    if (error) {
        throw error;
    }

    // check that data is not null
    if (!data) {
        throw new Error("No data returned from createUser");
    }

    // Create racer in database
    const userId = data.user.id;
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
