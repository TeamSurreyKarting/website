import { getServerSession } from 'next-auth';
import {authOptions} from "@/app/lib/auth";
import { redirect } from 'next/navigation';

export default async function Admin() {
    const session = await getServerSession(authOptions);

    if(session){
        return (
            <div className="flex flex-col">
                <div className="w-full flex justify-end px-5">
                    <p className="bg-lightning-gold-500 w-fit p-2 rounded-lg transition-colors hover:bg-lightning-gold-400 hover:cursor-pointer">
                        {
                            session?.user?.email
                                ? <a href="/api/auth/signout">Sign Out</a>
                                : ""
                        }
                    </p>
                </div>
                <div>
                    <h1>Admin Panel</h1>
                    <p>Signed In User: {session?.user?.name || "Sign In"}</p>
                    <p>User Email: {session?.user?.email || ""}</p>
                </div>
            </div>

        )
            ;
    } else {
        console.log("Redirecting to Sign In Page, User Not Signed In");
        redirect('http://localhost:3000/api/auth/signin?callbackUrl=/admin');
    }
}
