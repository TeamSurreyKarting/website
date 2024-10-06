'use server';

import { revalidatePath } from "next/cache";
import { createServiceClient } from "../../supabase/server";
import { redirect } from "next/navigation";

export async function setUserAdminState(userId: string, newState: boolean) {
    // init supabase
    const supabase = createServiceClient();

    // get user
    const { data: user, error } = await supabase.auth.admin.getUserById(userId);

    // check for errors
    if (error) {
        throw error;
    }

    // check that data is not null
    if (!user) {
        throw new Error("No user found");
    }
    // update user role
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        app_metadata: {
            'is_admin': newState
        }
    });

    // check for errors
    if (updateError) {
        throw updateError;
    }

    // Get updated user
    const { data: updatedUser, error: updatedUserError } = await supabase.auth.admin.getUserById(userId);

    console.log("updated user:", updatedUser);
    console.log("updated user error:", updatedUserError);

    revalidatePath(`/admin/users/${userId}`);
    redirect(`/admin/users/${userId}`);
}

export async function updateUserDetails(formData: FormData) {
    // init supabase
    const supabase = createServiceClient();

    const userId = formData.get("userId") as string;
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    // update user details
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        email: email,
        user_metadata: {
            first_name: firstName,
            last_name: lastName
        }
    });

    // check for errors
    if (updateError) {
        throw updateError;
    }

    revalidatePath(`/admin/users/${userId}`);
    redirect(`/admin/users/${userId}`);
}

export async function requestPasswordReset(email: string) {
    // init supabase
    const supabase = createServiceClient();

    // request password reset
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    // check for errors
    if (error) {
        throw error;
    }
}
