'use client';

import { createClient } from '@/app/utils/supabase/client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading } from "react-icons/ai";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [randInt, setRandInt] = useState<number>(1);

    const router = useRouter();

    useEffect(() => {
        setRandInt(Math.floor(Math.random() * 10) + 1);
    }, []);

    const supabase = createClient();

    const handleLogin = async (formData: FormData) => {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { error } = await supabase.auth.signInWithPassword(data);

        if (error) {
            setLoading(false);
            setError(error.message);
            return;
        }

        router.push('/admin');
    }

    return (
        <div
            className={`w-full h-screen mx-auto p-8 bg-nile-blue-950 bg-no-repeat bg-cover flex justify-center items-center`}
            >
            <div className="bg-nile-blue-950 p-4 rounded-xl shadow-lg max-w-[400px]">
                <div className="flex flex-col items-center">
                    <Image src="/TeamSurreyKarting/Team Surrey Karting Club Logo - Solid Background.png" width={200} height={200} alt='Team Surrey Karting Club Logo' />
                    <h1 className="text-2xl font-bold">Sign In</h1>
                </div>
                <div>
                    <form 
                        className="flex flex-col items-center justify-stretch"
                        onSubmit={(e) => {
                            setLoading(true);
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleLogin(formData);
                        }}
                        >
                        <div className="mb-4 w-full">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                        </div>
                        <div className="mb-4 w-">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="password" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                        </div>
                        {isLoading && <p className="mb-4 text-lightning-gold-600"><AiOutlineLoading className="animate-spin" /></p>}
                        {(!isLoading && error) && <p className="mb-4 text-red-500">{error}</p>}
                        <button className="bg-lightning-gold-600 w-full px-4 py-2 rounded-lg">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}