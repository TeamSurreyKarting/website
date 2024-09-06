import { createBrowserClient } from "@supabase/ssr";
// import { Database } from "@/database.types";

// export const createClient = () =>
//     createBrowserClient<Database>( // note that this exposes the db schema to clients (sec risk)
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     );

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
