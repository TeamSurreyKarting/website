import RaceLeagueResults from "@/app/components/league/RaceLeagueResults";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function RaceLeague() {

    // Set breadcrumbs
    const breadcrumbs = [
        { label: 'Race Leagues', href: '/race-league' },
    ];

    return (
        <div className={"p-5 w-full md:w-[70%] mx-auto rounded-lg"}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <RaceLeagueResults />
        </div>
    );
}