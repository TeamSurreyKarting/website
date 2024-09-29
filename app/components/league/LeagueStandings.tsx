'use client';

import { fetchLeagueStandings, fetchExperienceLevels, LeagueStanding } from "@/app/utils/league/functions";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default async function LeagueStandings({ leagueId }: { leagueId: number }) {
    const [dataFilter, setDataFilter] = useState<string | null>(null); // null signifies no filter
    const [standings, setStandings] = useState<LeagueStanding[]>([]);

    // Fetch `experience_level` enum values
    // Fetch league standings
    // fixme: infinite request loop (somehow?)
    const [experienceLevels, leagueStandings] = await Promise.all([
        fetchExperienceLevels(),
        []
        // fetchLeagueStandings(leagueId)
    ]);

    if (!leagueStandings) {
        return <div className="text-center bg-nile-blue-700 rounded-md p-2">No standings available</div>;
    }

    if (leagueStandings.length === 0) {
        return <div className="text-center bg-nile-blue-700 rounded-md p-2">No standings available</div>;
    }
    
    // Set standings
    setStandings(leagueStandings);

    // Watch for changes to data filter to then update standings
    useEffect(() => {
        if (dataFilter) {
            // Filter the standings by experience level
            const filteredStandings = leagueStandings.filter((standing) => standing.racer.exp_level === dataFilter);
            setStandings(filteredStandings);
        } else {
            setStandings(leagueStandings);
        }
    }, [dataFilter]);

    return (
        <>
            <div className="flex flex-row gap-4 mb-4">
                <button className="bg-nile-blue-700 text-white rounded-md p-2"
                        onClick={() => setDataFilter(null)}>
                    All Levels
                </button>
                {experienceLevels.map(
                    (xpLevel) => (
                        <button 
                            key={xpLevel}
                            className="bg-nile-blue-700 text-white rounded-md p-2"
                            onClick={() => setDataFilter(xpLevel)}>
                            {xpLevel.charAt(0).toUpperCase() + xpLevel.slice(1).toLowerCase()}
                        </button>
                    )
                )}
            </div>
            <div className='flex flex-col gap-2 mx-2'>
                {
                    standings.map((standing, index) => (
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
        </>
    );
}