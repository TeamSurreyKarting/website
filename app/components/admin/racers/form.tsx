import { Button } from "@/app/components/ui/Button";
import { createRacer } from "@/app/utils/admin/actions/racers";
import EmailUser from "./email-user";

export default function NewRacerForm() {
    return (
        <form action={createRacer}>
            <div className="p-4 bg-nile-blue-900 rounded-xl">
                <div className="mb-4">
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-300">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <EmailUser />
                <div className="mb-4">
                    <label htmlFor="studentIdExpiry" className="mb-2 block text-sm font-medium text-gray-300">
                        Student ID Expiry Date
                    </label>
                    <input
                        type="date"
                        id="studentIdExpiry"
                        name="studentIdExpiry"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="experienceLevel" className="mb-2 block text-sm font-medium text-gray-300">
                        Experience Level
                    </label>
                    <select id="experienceLevel" name="experienceLevel" className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm">
                        <option value="rookie">Rookie</option>
                        <option value="experienced">Experienced</option>
                        <option value="graduate">Graduate</option>
                    </select>
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit">Add Racer</Button>
            </div>
        </form>
    );
}
