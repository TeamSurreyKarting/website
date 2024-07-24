import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (
        <div className=" z-40 inset-0 h-fit text-text bg-transparent">
            <div className="flex justify-between items-center p-4 bg-primary">
                {/*<div className="text-xl font-bold">Team Surrey Karting</div>*/}
                <div>
                    <Image
                        src="/TeamSurreyKarting/Team Surrey Karting Club Logo (Not Square).svg"
                        alt="Logo"
                        width={90}
                        height={90}
                    />
                </div>
                <div className="flex gap-4 mx-3">
                    <Link href="/" className="text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">
                        Home
                    </Link>
                    <Link href="/leaderboard" className="text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">
                        Leaderboard
                    </Link>
                    <Link href="/bukc" className="text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">
                        BUKC
                    </Link>

                </div>
            </ div>

        </div>
    );
}