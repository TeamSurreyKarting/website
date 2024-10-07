import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { Suspense } from "react";
import UserList from "@/app/components/admin/users/list";
import Link from "next/link";

export default function Page() {
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
                    <UserList />
                </Suspense>
                <div className={"rounded-xl border-2 border-dashed border-nile-blue-600 bg-nile-blue-900 flex flex-col items-center justify-center text-gray-200"}>
                    <h1 className="text-2xl">Select a user to view details</h1>
                </div>
            </div>
        </>
    );
}
