import NewUserForm from "@/app/components/admin/users/form";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function Page() {
    const breadcrumbs = [
        { label: "Users", href: "/admin/users" },
        { label: "New User", href: `/admin/users/new`, active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <NewUserForm />
        </>
    );
}
