import NewLeagueForm from "@/app/components/admin/leagues/form";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function Page() {
    const breadcrumbs = [
        { label: "Leagues", href: "/admin/leagues" },
        { label: "New League", href: `/admin/leagues/new`, active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <NewLeagueForm />
        </>
    );
}
