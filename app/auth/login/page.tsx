import { login } from './actions'
import Image from 'next/image'

export default function LoginPage() {
    const randInt = Math.floor(Math.random() * 10) + 1;
    return (
        <div
            className={`w-full h-screen mx-auto p-8 bg-lightning-gold-500/20 bg-[url('/images/BUKC/${randInt}.jpg')] bg-no-repeat bg-cover flex justify-center items-center`}
            >
            <div className="bg-nile-blue-950 p-4 rounded-xl shadow-lg max-w-[400px]">
                <div className="flex flex-col items-center">
                <Image src="/TeamSurreyKarting/Team Surrey Karting Club Logo - Solid Background.png" width={200} height={200} alt='Team Surrey Karting Club Logo' />
                    <h1 className="text-2xl font-bold ">Sign In</h1>
                </div>
                <div>
                    <form className="flex flex-col items-center justify-stretch" action={login}>
                        <div className="mb-4 w-full">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="password" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                        </div>
                        <button className="bg-lightning-gold-600 w-fit">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}