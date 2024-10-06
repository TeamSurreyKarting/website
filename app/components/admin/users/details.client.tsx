'use client'

import { Button } from "@/app/components/ui/Button";
import { requestPasswordReset, setUserAdminState, updateUserDetails } from "@/app/utils/admin/actions/users";
import { User } from "@supabase/supabase-js";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { set } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";

export default function UserDetailsClient({ user }: { user: User }) {
    const [isEditing, setEditing] = useState(false);
    const [isRequestingPasswordReset, setRequestingPasswordReset] = useState(false);
    const [isUpdatingAdminState, setUpdatingAdminState] = useState(false);

    console.log(user);

    const isAdmin = user.app_metadata?.is_admin ?? false,
          createdAt = new Date(user.created_at),
          lastLogin = user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-GB') : 'Never',
          firstName = user.user_metadata?.first_name ?? "Unknown",
          lastName = user.user_metadata?.last_name ?? "Unknown",
          email = user.email;

    const handleUpdateDetails = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget;

        const formData = new FormData(form);
        await updateUserDetails(formData);
        setEditing(false);
    }

    const handlePasswordResetRequest = async () => {
        setRequestingPasswordReset(true);
        await requestPasswordReset(email!);
        setRequestingPasswordReset(false);
    }

    const handleAdminAccessChange = async () => {
        setUpdatingAdminState(true);
        await setUserAdminState(user.id, !isAdmin);
        setUpdatingAdminState(false);
    }

    return (
        <>
            <div className="flex justify-end gap-4">
                <Button
                    className={clsx({ "hidden": isEditing })}
                    onClick={() => handlePasswordResetRequest()}
                    >
                        { isRequestingPasswordReset ? (
                            <p className="mb-4 text-xl text-white"><AiOutlineLoading className="animate-spin" /></p>
                        ) : (
                            "Send Password Reset"
                        )}
                </Button>
                <Button
                    className={clsx({ "hidden": isEditing })}
                    onClick={() => handleAdminAccessChange()}
                    >
                        { isUpdatingAdminState && (
                            <p className="mb-4 text-xl text-white"><AiOutlineLoading className="animate-spin" /></p>
                        )}
                        { !isUpdatingAdminState && (isAdmin ? "Revoke Admin Access" : "Grant Admin Access") }
                </Button>
                <Button
                    onClick={() => setEditing(!isEditing)}
                    >
                        {isEditing ? "Cancel" : "Edit Details"}
                </Button>
            </div>
            { isEditing && (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => handleUpdateDetails(e)}
                    >
                    <input type="hidden" name="userId" value={user.id} />
                    <label>
                        First Name
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            defaultValue={firstName}
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue={lastName}
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={email}
                            className="w-full px-3 py-2 bg-nile-blue-700 border border-gray-300 rounded-md shadow-sm focus:ring-lightning-gold-500 focus:border-lightning-gold-500 sm:text-sm" />
                    </label>
                    <Button 
                        type="submit"
                        className="float-right mt-4 w-fit" >
                            Save
                    </Button>
                </form>
            )}
            { !isEditing && (
                <div className="flex flex-col gap-2 mt-4">
                    <h1 className="font-medium text-xl">{firstName} {lastName}</h1>
                    <p>{email}</p>
                    <p>Created: {createdAt.toLocaleDateString('en-GB')}</p>
                    <p>Last Login: {lastLogin}</p>
                </div>
            )}
        </>
    );
}