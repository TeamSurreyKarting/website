import RacerList from "@/app/components/admin/racers/list";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import Search from "@/app/components/ui/Search";
import Link from "next/link";

export default function Page() {
    const breadcrumbs = [
        { label: "Racers", href: "/admin/racers", active: true },
    ];

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
            <RacerList />
        </>
    );
}
