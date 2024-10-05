'use server';

import { createServiceClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = createServiceClient();
            
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        throw error;
    }

    revalidatePath('/admin');
    redirect('/');
}
