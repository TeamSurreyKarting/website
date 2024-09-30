import RacerList from "@/app/components/admin/racers/list";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import Search from "@/app/components/ui/Search";
import Link from "next/link";
import { Suspense } from "react";

export default function Page({ 
    searchParams 
    }: { 
    searchParams?: {
        query?: string;
    };
}) {
    const breadcrumbs = [
        { label: "Racers", href: "/admin/racers", active: true },
    ];

    const query = searchParams?.query || "";

    return (
        <>
            <div className="flex">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex-grow"></div>
                <Link href="/admin/racers/new" className="flex-none bg-lightning-gold-300 text-black p-4 rounded-xl">
                    New Racer
                </Link>
            </div>
            <hr className="my-6" />
            <Search placeholder="Search Racers..." />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <RacerList filter={query} />
                </Suspense>
            </div>
        </>
    );
}
