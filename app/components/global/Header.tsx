import Image from "next/image";

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
                    <div
                        className=" text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">Home
                    </div>
                    <div
                        className="text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">Leaderboard
                    </div>
                    <div
                        className="text-nile-blue-200 font-semibold transition-colors hover:text-nile-blue-400 hover: cursor-pointer">Contact
                    </div>

                </div>
            </ div>

        </div>
    );
}