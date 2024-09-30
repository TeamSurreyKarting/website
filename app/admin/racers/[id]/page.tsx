import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { createAnonClient } from "@/app/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const sb = createAnonClient();
    const racer = await sb.from("Racers").select().eq("id", id).single();

    if (!racer) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Racers", href: "/admin/racers" },
        { label: `${racer.data?.first_name} ${racer.data?.last_name}` || "", href: `/admin/racers/${id}`, active: true },
    ];

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            <h3>Memberships</h3>
            <hr className="my-6" />
            <h3>Leagues</h3>
        </>
    );
}
