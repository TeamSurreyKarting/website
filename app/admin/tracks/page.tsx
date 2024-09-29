import TrackList from "@/app/components/admin/tracks/list";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import Search from "@/app/components/ui/Search";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
    const breadcrumbs = [
        { label: "Tracks", href: "/admin/tracks", active: true },
    ]

    return (
        <>
            <div className="flex">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex-grow"></div>
                <Link href="/admin/tracks/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    New Track
                </Link>
            </div>
            <hr className="my-6" />
            <Search placeholder="Search Tracks..." />
            <Suspense fallback={<div>Loading...</div>}>
                <TrackList />
            </Suspense>
        </>
    );
}
