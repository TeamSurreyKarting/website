import NewTrackForm from "@/app/components/admin/tracks/form";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function Page() {
    const breadcrumbs = [
        { label: "Tracks", href: "/admin/tracks" },
        { label: "New Track", href: `/admin/tracks/new`, active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <NewTrackForm />
        </>
    );
}
