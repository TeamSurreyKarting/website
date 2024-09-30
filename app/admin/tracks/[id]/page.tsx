import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { createAnonClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const sb = createAnonClient();
    const track = await sb.from("Tracks").select().eq("id", id).single();

    if (!track) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Tracks", href: "/admin/tracks" },
        { label: track.data?.name || "", href: `/admin/tracks/${id}`, active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <hr className="my-6" />
            
        </>
    );
}
