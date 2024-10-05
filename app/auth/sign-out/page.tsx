'use client';

import { useRouter } from "next/navigation"
import { AiOutlineLoading } from "react-icons/ai"
import Image from "next/image"
import { createClient } from "@/app/utils/supabase/client";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const signOut = async () => {
            const supabase = createClient()
            
            const { error } = await supabase.auth.signOut();
            
            useRouter().push('/');
        }

        signOut();
    }, []);

    return (
        <div
            className={`w-full h-screen mx-auto p-8 bg-nile-blue-900 bg-no-repeat bg-cover flex justify-center items-center`}
            >
            <div className="bg-nile-blue-950 p-4 rounded-xl shadow-lg max-w-[400px]">
                <div className="flex flex-col items-center">
                <Image src="/TeamSurreyKarting/Team Surrey Karting Club Logo - Solid Background.png" width={200} height={200} alt='Team Surrey Karting Club Logo' />
                    <h1 className="text-2xl font-bold">Signing Out...</h1>
                </div>
                <AiOutlineLoading className="animate-spin" />
            </div>
        </div>
    );
}