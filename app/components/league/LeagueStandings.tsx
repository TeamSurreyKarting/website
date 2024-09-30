'use client';

import { LeagueStanding } from "@/app/utils/league/functions";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function LeagueStandings({ leagueId, experienceLevels, leagueStandings }: { leagueId: number, experienceLevels: string[], leagueStandings: LeagueStanding[] }) {
    const [filteredLeagueStandings, setFilteredLeagueStandings] = useState<LeagueStanding[]>(leagueStandings);
    const [xpFilter, setXpFilter] = useState<string>('');

    // Watch for changes to data filter to then update standings
    useEffect(() => {
        const filterData = async () => {        
            // Fetch league standings and experience levels
            // const leagueStandings = await fetchLeagueStandings(leagueId);

            if (xpFilter !== "") {
                // Filter the standings by experience level
                const filteredStandings = leagueStandings.filter((standing) => standing.racer.exp_level === xpFilter);
                setFilteredLeagueStandings(filteredStandings);
            } else {
                setFilteredLeagueStandings(leagueStandings);
            }
        }

        filterData();
    }, [xpFilter]);

    return (
        <>
            <div className="flex flex-row gap-4 mb-4">
                <button 
                    onClick={() => setXpFilter('')}
                    className={clsx(
                        "rounded-md p-2",
                        {
                            'bg-nile-blue-700 text-white': xpFilter !== '',
                            'bg-lightning-gold-500 text-black': xpFilter === '',
                        }
                    )} >
                    All Levels
                </button>
                {experienceLevels.map(
                    (xpLevel) => (
                        <button 
                            key={xpLevel} 
                            onClick={() => setXpFilter(xpLevel)}
                            className={clsx(
                                "rounded-md p-2",
                                {
                                    'bg-nile-blue-700 text-white': xpFilter !== xpLevel,
                                    'bg-lightning-gold-500 text-black': xpFilter === xpLevel,
                                }
                            )} >
                            {xpLevel.charAt(0).toUpperCase() + xpLevel.slice(1).toLowerCase()}
                        </button>
                    )
                )}
            </div>
            <div className='flex flex-col gap-2 mx-2'>
                {
                    (!filteredLeagueStandings || filteredLeagueStandings.length === 0) ? (
                        <div className="text-center bg-nile-blue-700 rounded-md p-2">No standings available</div>
                    ) : (
                        filteredLeagueStandings.map((standing, index) => (
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
                    )
                }
            </div>
        </>
    );
}