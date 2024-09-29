'use client';

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { addRaceLeagueEventSession } from "@/app/utils/admin/actions/leagues";
import { FaPlus } from "react-icons/fa";
import Modal from "../../ui/Modal";
  
export default function AddRaceLeagueEventSession({ leagueId, raceEventId }: { leagueId: number, raceEventId: number }) {
    const [isModalVisible, setModalVisibility] = useState<boolean>(false);
    
    return (
        <>
            <button 
                    className="bg-nile-blue-600 hover:bg-lightning-gold-400 border-2 border-lightning-gold-400 text-white hover:text-black px-4 py-2 rounded-md"
                    onClick={() => setModalVisibility(true)}
                    >
                    <FaPlus />
            </button>
            <Modal isOpen={isModalVisible} onClose={() => setModalVisibility(false)}>
                <h3 className="font-medium mb-4">Add Race Event Session</h3>
                <form action={addRaceLeagueEventSession}>
                    <input type="hidden" name="leagueId" value={leagueId} />
                    <input type="hidden" name="raceEventId" value={raceEventId} />
                    <div className="mb-4">
                        <label htmlFor="startTime" className="mb-2 block text-sm font-medium text-gray-300">
                            Start Time
                        </label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" 
                            required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" className="mb-2 block text-sm font-medium text-gray-300">
                            End Time
                        </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" 
                            required />
                    </div>
                    <div className="flex flex-row">
                        <Button className="bg-nile-blue-700 border-2 border-lightning-gold-400" onClick={() => setModalVisibility(false)}>Close</Button>
                        <div className="flex-grow" />
                        <Button 
                            type="submit" 
                            className="float-right" 
                            onClick={(e) => {
                                const form = e.currentTarget.closest('form');
                                if (form && form.checkValidity()) {
                                    setModalVisibility(false);
                                }
                            }}
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
