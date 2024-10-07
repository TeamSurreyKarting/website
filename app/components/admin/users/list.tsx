'use server';
import { createServiceClient } from "@/app/utils/supabase/server";
import clsx from "clsx";
import Link from "next/link";

export default async function UserList({ userId }: { userId?: string }) {
    const supabase = createServiceClient();
    const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers();

    if (listUsersError) throw listUsersError;

    if (users === null || users.length === 0) {
        return (
            <p>No users found.</p>
        );
    } 
    
    return (
        <div className="flex flex-col gap-4">
            {
                users?.map((user) => (
                    <Link key={user.id} 
                        href={`/admin/users/${user.id}`}
                        className={clsx(
                            "p-4 rounded-xl",
                            {
                                "bg-lightning-gold-300 text-black": user.id === userId,
                                "bg-nile-blue-700 hover:bg-lightning-gold-300 hover:text-black": user.id !== userId
                            }
                        )}>
                        <p className="mb-2">{ (user.user_metadata?.first_name && user.user_metadata?.last_name) ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` : user.email }</p>
                        <span className={clsx(
                                    "rounded-full border-2 border-lightning-gold-500 px-2 py-1 text-sm",
                                    {
                                        "bg-[#66369D] border-2 border-[#66369D] text-white font-medium": user.app_metadata.is_admin && user.id === userId,
                                        "bg-lightning-gold-600 border-lightning-gold-600 text-white font-medium": !user.app_metadata.is_admin && user.id === userId,
                                    }
                                )}>
                            { user.app_metadata?.is_admin ? "Admin" : "Standard" } User
                        </span>
                    </Link>
                ))
            }
        </div>
    );
}
