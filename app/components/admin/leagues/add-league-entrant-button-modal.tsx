'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/app/components/ui/Button";
import { addLeagueEntrant } from "@/app/utils/admin/actions/leagues";
import { Database } from "@/database.types";
import Modal from "../../ui/Modal";
  
export default function AddLeagueEntrant({ leagueId }: { leagueId: number }) {
    const [isLeagueEntrantModalVisible, setLeagueEntrantModalVisibility] = useState<boolean>(false);
    const [racersData, setRacersData] = useState<Database['public']['Tables']['Racers']['Row'][] | null>(null);

    useEffect(() => {
        const fetchRacers = async () => {
            const supabase = createClient();

            // Obtain racers
            const { data, error } = await supabase.rpc('racers_not_league_entrants', { requested_league_id: leagueId })
        
            // Check for errors
            if (error) {
                setRacersData(null);
                throw error;
            }
            
            setRacersData(data);
        }
        
        fetchRacers();
    }, [isLeagueEntrantModalVisible]);
    
    return (
        <>
            <Button onClick={() => setLeagueEntrantModalVisibility(true)}>
                Add Entrant
            </Button>
            <Modal isOpen={isLeagueEntrantModalVisible} onClose={() => setLeagueEntrantModalVisibility(false)}>
                <h3 className="font-medium mb-4">Add Entrant</h3>
                <form action={addLeagueEntrant}>
                    <input type="hidden" name="leagueId" value={leagueId} />
                    <div className="mb-4">
                        <label htmlFor="racer" className="mb-2 block text-sm font-medium text-gray-300">
                            Racer
                        </label>
                        <select id="racer" name="racer" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                            <option value="" selected disabled></option>
                            {racersData && racersData?.map((racer) => (
                                <option key={racer.id} value={racer.id}>{racer.first_name} {racer.last_name}</option>
                            ))}
                        </select>
                        <p className="mt-2 text-lightning-gold-500 text-sm font-light">Note that the dropdown will only show racers not currently entered into the league.</p>
                    </div>
                    <div className="flex flex-row">
                        <Button className="bg-nile-blue-700 border-2 border-lightning-gold-400" onClick={() => setLeagueEntrantModalVisibility(false)}>Close</Button>
                        <div className="flex-grow" />
                        <Button type="submit" onClick={() => setLeagueEntrantModalVisibility(false)}>Add</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
