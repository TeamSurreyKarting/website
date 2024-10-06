import NewAdminUserForm from "@/app/components/admin/admin-users/form";
import AdminUserList from "@/app/components/admin/admin-users/list";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { Suspense } from "react";

export default function Page() {
    const breadcrumbs = [
        { label: "Admin Users", href: "/users", active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            {/* <LeagueFilter /> */}
            <div className="grid md:grid-cols-2 gap-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <AdminUserList />
                </Suspense>
                <NewAdminUserForm />
            </div>
        </>
    );
}
