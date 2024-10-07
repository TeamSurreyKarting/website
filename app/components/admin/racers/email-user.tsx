'use client';

import { AiOutlineLoading } from "react-icons/ai";
import { createClient } from "@/app/utils/supabase/client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";

export default function EmailUser() {
    const [email, setEmail] = useState('');
    const [firstSearchPerformed, setFirstSearchPerformed] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const supabase = createClient();

    const handleEmailQuery = useDebouncedCallback(async (email: string) => {
        const { data: userExistsQueryResult, error } = await supabase.rpc('racer_exists', { user_email: email });

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        console.log(userExistsQueryResult);

        setUserExists(userExistsQueryResult);
        setFirstSearchPerformed(true);
        setLoading(false);
    }, 1000);

    return (
        <>
            <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="false"
                    className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm"
                    onChange={(e) => {
                        setLoading(true);
                        setEmail(e.target.value);
                        handleEmailQuery(e.target.value);
                    }} />

                <div className={clsx("mt-2 space-x-2 text-sm",
                    {
                        "flex": isLoading && (email.length !== 0),
                        "hidden": !isLoading || (email.length === 0),
                    }
                )}>
                    <AiOutlineLoading className=" h-full animate-spin" />
                    <p>Checking for existing account...</p>
                </div>
                <div className={clsx("mt-2 space-x-2 text-sm",
                    {
                        "flex": !isLoading && firstSearchPerformed && (email.length !== 0),
                        "hidden": isLoading || (email.length === 0),
                    }
                )}>
                    {(
                        userExists
                            ? <p className="text-sm text-green-500">Racer will merge with existing user account</p>
                            : <p className="text-sm text-lightning-gold-600">Racer will have an account created</p>
                    )}
                </div>
            </div>
        </>
    );
}
