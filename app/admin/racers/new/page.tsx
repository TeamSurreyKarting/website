import NewRacerForm from "@/app/components/admin/racers/form";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function Page() {
    const breadcrumbs = [
        { label: "Racers", href: "/admin/racers" },
        { label: "New Racer", href: `/admin/racers/new`, active: true },
    ];

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <NewRacerForm />
        </>
    );
}
