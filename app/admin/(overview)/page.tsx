import Image from "next/image";
import Link from "next/link";
import { FaPiggyBank } from "react-icons/fa6";

export default function Page() {
    return (
        <>
            <h1 className="text-2xl mb-4">Team Surrey Karting Admin Area</h1>
            <h2 className="text-lg">Quick Links</h2>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 my-2">
                <Link
                    href="https://bukc.alphatiming.co.uk/profile" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex flex-col gap-4 items-center justify-between bg-nile-blue-700 text-white hover:bg-nile-blue-500 px-4 pt-6 pb-4 rounded-lg">
                    <Image src="/BUKC/bukc-white.svg" alt="BUKC Logo" width={150} height={100} />
                    BUKC Admin
                </Link>
                <Link 
                    href="https://results.alphatiming.co.uk/bukc" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex flex-col gap-4 items-center justify-between bg-nile-blue-700 text-white hover:bg-nile-blue-500 px-4 pt-6 pb-4 rounded-lg">
                    <Image src="/AlphaTiming/logo_with_name.svg" alt="Alpha Timing Logo" width={150} height={100} />
                    BUKC Results
                </Link>
                <Link 
                    href="https://my.ussu.co.uk/activity/Pages/ComPanel.aspx?RootFolder=%2Factivity%2FClubDocuments%2Fnone" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex flex-col gap-4 items-center justify-between bg-nile-blue-700 text-white hover:bg-nile-blue-500 px-4 pt-6 pb-4 rounded-lg">
                    <Image src="/StudentUnion/SSU_Logo_H_Left_White.svg" alt="Alpha Timing Logo" width={150} height={100} />
                    Signatories Panel
                </Link>
                <Link 
                    href="https://my.ussu.co.uk/activity/Withdrawals/Forms/AllItems.aspx" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex flex-col gap-4 items-center justify-between bg-nile-blue-700 text-white hover:bg-nile-blue-500 px-4 pt-6 pb-4 rounded-lg">
                    <FaPiggyBank size={50} />
                    Finance Requests
                </Link>
            </div>
        </>
    );
}
