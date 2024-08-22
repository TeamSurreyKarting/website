'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push('http://localhost:3000/admin');
        }
    };

    return (
        <div className="w-full h-[80vh] mx-auto p-8 bg-[url('/images/BUKC/9.jpg')] bg-fixed flex justify-center items-center"
        >
            <div className="bg-nile-blue-500/80 p-5 rounded-xl shadow-lg max-w-[400px] max-h-[300px]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold ">Sign In</h1>

                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-0.5 rounded-lg"
                            />
                        </div>
                        <div style={{marginBottom: '1rem'}}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-0.5 rounded-lg"
                            />
                        </div>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <div className="w-full flex justify-center">
                            <button type="submit" className=" text-center w-fit bg-lightning-gold-300 p-2 px-3 rounded-xl font-semibold shadow-lg transition-colors hover:bg-lightning-gold-400">
                                Sign In
                            </button>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );
}
