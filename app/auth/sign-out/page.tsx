'use client';

import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";

export default function Page() {
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const signOutAction = async () => {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                throw error;
            }
            
            router.push('/');
        }

        signOutAction();
    }, []);

    return (
        <div
        className={`w-full h-screen mx-auto p-8 bg-nile-blue-950 bg-no-repeat bg-cover flex justify-center items-center`}
        >
        <div className="bg-nile-blue-950 p-4 rounded-xl shadow-lg max-w-[400px]">
            <div className="flex flex-col items-center">
                <Image src={"/TeamSurreyKarting/Team Surrey Karting Club Logo - Solid Background.png"} width={200} height={200} alt='Team Surrey Karting Club Logo' />
                <h1 className="text-2xl font-bold">Signing you out...</h1>
                <AiOutlineLoading className="mt-4 text-2xl font-bold animate-spin" />
            </div>
        </div>
    </div>
    );
}
