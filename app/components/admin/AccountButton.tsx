'use client';

import { createClient } from "@/app/utils/supabase/client";
import { User } from "@supabase/auth-js";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaRegUserCircle } from "react-icons/fa";

export default function AccountButton() {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUserDetails = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user details:", error);
                return;
            }
            setUser(user);
        }

        getUserDetails();

        console.log("user:", user);
    
    }, []);

    return (
        <>
            <div
                className="hidden md:block flex flex-col p-3 gap-4 rounded-lg text-sm font-medium text-white bg-nile-blue-900 md:p-3">
                    <div className="flex flex-row gap-4">
                        <FaRegUserCircle className="w-6 h-6" />
                        <span className={clsx("md:text-lg",
                            { 
                                "opacity-0": user === null,
                                "opacity-100": user !== null
                            }
                            )}>Hi { user?.user_metadata.first_name }</span>
                    </div>
                <Link 
                    href="/auth/sign-out"
                    className={"hover:bg-lightning-gold-300 hover:text-black p-2 flex flex-row grow items-center justify-center gap-4 rounded-lg text-sm font-medium md:flex-none md:justify-start"}
                    >
                    <span className="hidden md:block">Sign Out</span>
                    <FaSignOutAlt className="w-6 h-6" />
                </Link>
            </div>
            <Link 
                href="/auth/sign-out"
                className={"block md:hidden hover:bg-lightning-gold-300 hover:text-black p-2 flex flex-row grow items-center justify-center gap-4 rounded-lg text-sm font-medium md:flex-none md:justify-start"}
                >
                <span className="hidden md:block">Sign Out</span>
                <FaSignOutAlt className="w-6 h-6" />
            </Link>
        </>
    );
}