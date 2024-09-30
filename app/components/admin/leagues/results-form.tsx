import { Button } from "@/app/components/ui/Button";
import { addRaceEventResult } from "@/app/utils/admin/actions/leagues";
import { createAnonClient } from "@/app/utils/supabase/server";

export default async function RaceEventResultsForm({ sessionId }: { sessionId: number }) {
    const supabase = createAnonClient();

    // Obtain racers
    const { data: racersData, error: racersError } = await supabase.from("Racers").select();

    // Check for errors
    if (racersError) throw racersError;

    return (
        <form action={addRaceEventResult} className="my-2">
            <input type="hidden" name="eventSessionId" value={sessionId} />
            <div className="p-4 bg-nile-blue-900 rounded-xl">
                <div className="mb-4">
                    <label htmlFor="racer" className="mb-2 block text-sm font-medium text-gray-300">
                        Racer
                    </label>
                    <select id="racer" name="racer" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                        <option value="" selected disabled>Please select a racer</option>
                        {racersData.map((racer) => (
                            <option key={racer.id} value={racer.id}>{racer.first_name} {racer.last_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="fastestLap" className="mb-2 block text-sm font-medium text-gray-300">
                        Fastest Lap
                    </label>
                    <input type="number" id="fastestLap" name="fastestLap" step="0.001" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit">Submit Result</Button>
            </div>
        </form>
    );
}
