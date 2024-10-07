import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { Suspense } from "react";
import UserList from "@/app/components/admin/users/list";
import UserDetails from "@/app/components/admin/users/details";
import Link from "next/link";

export default function Page({ params }: { params: { userId: string } }) {
    const breadcrumbs = [
        { label: "Users", href: "/users", active: true },
    ]

    return (
        <>
            <div className="flex">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex-grow"></div>
                <Link href="/admin/users/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    New User
                </Link>
            </div>
            <hr className="my-6" />
            <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <UserList userId={params.userId} />
                </Suspense>
                <div className={"order-first md:order-last rounded-xl bg-nile-blue-800 grid grid-rows-[auto_1fr] gap-2 p-4 text-gray-200"}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserDetails userId={params.userId} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
