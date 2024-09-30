'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';

export default function SignOut() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error);
            // Optionally handle the error, e.g., show a message
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <div>
            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    );
}
