import TrackList from "@/app/components/admin/tracks/list";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import Search from "@/app/components/ui/Search";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({ 
    searchParams 
    }: { 
    searchParams?: {
        query?: string;
    };
}) {
    const breadcrumbs = [
        { label: "Tracks", href: "/admin/tracks", active: true },
    ];

    const query = searchParams?.query || "";

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
            <Suspense key={query} fallback={<div>Loading...</div>}>
                <TrackList filter={query} />
            </Suspense>
        </>
    );
}
