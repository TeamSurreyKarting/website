'use server'

import { createServiceClient } from "@/app/utils/supabase/server";
import UserDetailsClient from "./details.client";

export default async function UserDetails({ userId }: { userId: string }) {
    const supabase = createServiceClient();

    const { data: { user }, error} = await supabase.auth.admin.getUserById(userId);

    if (!user || error) {
        console.log(user, error)
        return (
            <p>No user found.</p>
        );
    }

    return <UserDetailsClient user={user} />;
}
