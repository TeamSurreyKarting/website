import { createAnonClient } from "@/app/utils/supabase/server";
import Link from "next/link";

export default async function AdminUserList() {
    const supabase = createAnonClient();
    const { data: users } = await supabase.from("AdminUser").select('id, User( id, first_name, last_name )');

    return (users === null || users.length === 0) ? (
            <p>No admin users found.</p>
        ) : (
            users?.map((racer) => (
            <div key={racer.id} className="bg-nile-blue-700 hover:bg-lightning-gold-300 hover:text-black p-4 rounded-xl">
                <p className="text-lg">{racer.User.first_name} {racer.User.last_name}</p>
            </div>
        ))
    );
}
