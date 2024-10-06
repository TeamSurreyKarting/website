import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { Suspense } from "react";
import UserList from "@/app/components/admin/users/list";
import UserDetails from "@/app/components/admin/users/details";

export default function Page({ params }: { params: { userId: string } }) {
    const breadcrumbs = [
        { label: "Users", href: "/users", active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <UserList userId={params.userId} />
                </Suspense>
                <div className={"rounded-xl bg-nile-blue-800 grid grid-rows-[auto_1fr] gap-2 p-4 text-gray-200"}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserDetails userId={params.userId} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
