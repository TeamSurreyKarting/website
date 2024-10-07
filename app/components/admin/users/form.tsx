import { Button } from "@/app/components/ui/Button";
import { createUser } from "@/app/utils/admin/actions/users";

export default function NewUserForm() {
    return (
        <form action={createUser}>
            <div className="p-4 bg-nile-blue-900 rounded-xl">
                <div className="mb-4">
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
                        First Name
                    </label>
                    <input
                        required
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
                        required
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit">Create User</Button>
            </div>
        </form>
    );
}
