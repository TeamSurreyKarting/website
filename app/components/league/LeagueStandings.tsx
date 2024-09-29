import { fetchLeagueStandings } from "@/app/utils/league/functions";
import clsx from "clsx";

export default async function LeagueStandings({ leagueId }: { leagueId: number }) {
    // Fetch league standings
    const leagueStandings = await fetchLeagueStandings(leagueId);

    if (!leagueStandings) {
        return <div className="text-center bg-nile-blue-700 rounded-md p-2">No standings available</div>;
    }

    if (leagueStandings.length === 0) {
        return <div className="text-center bg-nile-blue-700 rounded-md p-2">No standings available</div>;
    }

    return (
        <div id={'standings'} className={'flex flex-col gap-2'}>
            {
                leagueStandings.map((standing, index) => (
                    <div key={standing.racer.id} className={'grid grid-cols-[2rem_1fr_0fr] gap-2 rounded-md shadow-sm'}>
                        <span className={clsx(
                                `px-2 text-lg text-center font-semibold -skew-x-6 rounded-sm`,
                                {
                                    'bg-lightning-gold-600': index === 0,
                                    'bg-slate-500': index === 1,
                                    'bg-lightning-gold-800': index === 2,
                                    'bg-nile-blue-400': (index % 2 === 1) && !([0,1,2].includes(index)),
                                    'bg-nile-blue-300': (index % 2 === 0) && !([0,1,2].includes(index)),
                                }
                            )}>
                            <div className={'skew-x-6'}>{index + 1}</div>
                        </span>
                        <span className={clsx(
                                `px-2 text-lg -skew-x-6 font-semibold rounded-sm`,
                                {
                                    'bg-lightning-gold-600': index === 0,
                                    'bg-slate-500': index === 1,
                                    'bg-lightning-gold-800': index === 2,
                                    'bg-nile-blue-400': (index % 2 === 1) && !([0,1,2].includes(index)),
                                    'bg-nile-blue-300': (index % 2 === 0) && !([0,1,2].includes(index)),
                                }
                            )}>
                            <div className={'skew-x-6 px-4'}>{standing.racer.name}</div>
                        </span>
                        <span className={clsx(
                                `px-2 text-lg text-center font-semibold -skew-x-6 rounded-sm`,
                                {
                                    'bg-lightning-gold-600': index === 0,
                                    'bg-slate-500': index === 1,
                                    'bg-lightning-gold-800': index === 2,
                                    'bg-nile-blue-400': (index % 2 === 1) && !([0,1,2].includes(index)),
                                    'bg-nile-blue-300': (index % 2 === 0) && !([0,1,2].includes(index)),
                                }
                            )}>
                            <div className={'skew-x-6'}>{standing.points}&nbsp;points</div>
                        </span>
                    </div>
                ))
            }
        </div>
    );
}