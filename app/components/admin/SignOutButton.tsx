import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
    return (
        <Link 
            href="/auth/sign-out"
            className={"flex h-[56px] grow items-center justify-center gap-4 rounded-lg p-3 text-sm font-medium bg-nile-blue-900 text-white hover:bg-lightning-gold-300 hover:text-gray-500 md:flex-none md:justify-start md:p-2 md:px-3"}
            >
            <FaSignOutAlt className="w-6 h-6" />
            <span>Sign Out</span>
        </Link>
    );
}