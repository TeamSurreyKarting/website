import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { createAnonClient } from "@/app/utils/supabase/server";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const sb = createAnonClient();
    const track = await sb.from("Tracks").select().eq("id", id).single();

    const breadcrumbs = [
        { label: "Tracks", href: "/admin/tracks" },
        { label: track.data?.name || "", href: `/admin/tracks/${id}` },
        { label: 'Edit', href: `/admin/tracks/${id}/edit`, active: true },
    ];

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            
        </>
    );
}