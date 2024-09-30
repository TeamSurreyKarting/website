import { Button } from "@/app/components/ui/Button";
import { createTrack } from "@/app/utils/admin/actions/tracks";

export default function NewLeagueForm() {
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
                <div className="mb-4">
                    <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-gray-300">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-300">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="pointsAllocationMethod" className="mb-2 block text-sm font-medium text-white">
                        Points Allocation Method
                    </label>
                    <select id="pointsAllocationMethod" name="pointsAllocationMethod" className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                        <option value="" selected disabled></option>
                        <option value="formula1_top10">F1 Top 10</option>
                        <option value="linear_top10">Linear Top 10</option>
                    </select>
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit">Add Track</Button>
            </div>
        </form>
    );
}
