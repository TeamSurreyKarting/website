import { Button } from "@/app/components/ui/Button";
import { createTrack } from "@/app/utils/admin/actions/tracks";

export default function NewTrackForm() {
    return (
        <form action={createTrack}>
            <div className="p-4 bg-nile-blue-900 rounded-xl">
                <div className="mb-6">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="type" className="mb-2 block text-sm font-medium text-white">
                        Type
                    </label>
                    <select id="type" name="type" className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="trackMap" className="mb-2 block text-sm font-medium text-white">
                        Track Map
                    </label>
                    <input
                        type="file"
                        id="trackMap"
                        name="trackMap"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit">Add Track</Button>
            </div>
        </form>
    );
}
