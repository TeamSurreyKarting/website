import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'
import Link from 'next/link';
import SignOut from "@/app/components/auth/SignOut";

export default async function Admin() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    const signOut = supabase.auth.signOut()

    if (error || !data?.user) {
        redirect('/auth/login')
    }
        return (
            <div className="flex flex-col">
                <div className="w-full flex justify-end px-5">
                    {/*<p className="bg-lightning-gold-500 w-fit p-2 rounded-lg transition-colors hover:bg-lightning-gold-400 hover:cursor-pointer">*/}
                        <SignOut />
                    {/*</p>*/}
                </div>
                <div>
                    <h1>Admin Panel</h1>

                </div>
            </div>

        );
}
