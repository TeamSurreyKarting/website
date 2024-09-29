'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/app/components/ui/Button";
import { addLeagueEntrant, addRaceLeagueEvent } from "@/app/utils/admin/actions/leagues";
import { Database } from "@/database.types";
import Modal from "../../ui/Modal";
  
export default function AddEventSeries({ leagueId }: { leagueId: number }) {
    const [isModalVisible, setModalVisibility] = useState<boolean>(false);
    const [tracksData, setTracksData] = useState<Database['public']['Tables']['Tracks']['Row'][] | null>(null);

    useEffect(() => {
        const fetchRacers = async () => {
            const supabase = createClient();

            // Obtain tracks data
            const { data, error } = await supabase.from('Tracks').select('*').order('name');
        
            // Check for errors
            if (error) {
                setTracksData(null);
                throw error;
            }
            
            setTracksData(data);
        }
        
        fetchRacers();
    }, [isModalVisible]);
    
    return (
        <>
            <Button onClick={() => setModalVisibility(true)}>
                Add Race Event
            </Button>
            <Modal isOpen={isModalVisible} onClose={() => setModalVisibility(false)}>
                <h3 className="font-medium mb-4">Add Race Event</h3>
                <form action={addRaceLeagueEvent}>
                    <input type="hidden" name="leagueId" value={leagueId} />
                    <div className="mb-4">
                        <label htmlFor="track" className="mb-2 block text-sm font-medium text-gray-300">
                            Track
                        </label>
                        <select id="track" name="track" required className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                            <option value="" selected disabled></option>
                            {tracksData && tracksData?.map((track) => (
                                <option key={track.id} value={track.id}>{track.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="arrivalTime" className="mb-2 block text-sm font-medium text-gray-300">
                            Arrival Time
                        </label>
                        <input
                            type="datetime-local"
                            id="arrivalTime"
                            name="arrivalTime"
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                    </div>
                    <div className="flex flex-row">
                        <Button className="bg-nile-blue-700 border-2 border-lightning-gold-400" onClick={() => setModalVisibility(false)}>Close</Button>
                        <div className="flex-grow" />
                        <Button type="submit" className="float-right" onClick={() => setModalVisibility(false)}>Add</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
