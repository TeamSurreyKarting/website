import {Enums} from "@/database.types";

function backgroundColor(index: number) {
    switch (index) {
        case 0:
            return 'bg-lightning-gold-500';
        case 1:
            return 'bg-slate-500';
        case 2:
            return 'bg-lightning-gold-800';
        default:
            return (index % 2 == 1) ? 'bg-nile-blue-400' : 'bg-nile-blue-300';
    }
}

export default function LeagueStandings({ standings }: { standings: Record<number, { id: number, name: string, exp_level: Enums<'experience_level'>, points: number}> }) {
    // Extract the racers from the standings object
    const racers = Object.values(standings);

    // Sort the racers by points
    racers.sort((a, b) => b.points - a.points);

    return (
        <div id={'standings'} className={'flex flex-col gap-2'}>
            {
                racers.map((racer, index) => (
                    <div key={racer.id} className={'grid grid-cols-[2rem_1fr_0fr] gap-2 rounded-md shadow-sm'}>
                        <span className={`${backgroundColor(index)} px-2 text-lg text-center font-semibold -skew-x-6 rounded-sm`}>
                            <div className={'skew-x-6'}>{index + 1}</div>
                        </span>
                        <span className={`${backgroundColor(index)} px-2 text-lg -skew-x-6 rounded-sm`}>
                            <div className={'skew-x-6 px-4'}>{racer.name}</div>
                        </span>
                        <span className={`${backgroundColor(index)} px-2 text-lg font-semibold -skew-x-6 rounded-sm`}>
                            <div className={'skew-x-6'}>{racer.points}&nbsp;points</div>
                        </span>
                    </div>
                ))
            }
        </div>
    );
}