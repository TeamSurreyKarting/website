import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="z-40 inset-0 h-fit text-text bg-transparent">
            <div className={'flex lg:hidden justify-between items-center p-2 bg-primary'}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={'w-8 aspect-square'}>
                    <path d="M4 18H10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <Link href="/">
                    <Image
                        src="/TeamSurreyKarting/Team Surrey Karting Club Logo (Not Square).svg"
                        alt="Logo"
                        width={120}
                        height={120}
                    />
                </Link>
                <div className={'w-8'}>
                    {/*  To make the logo exactly center lol  */}
                </div>
            </div>
            <div className={"hidden lg:flex justify-between items-center p-4 bg-primary"}>
                <div>
                    <Image
                        src="/TeamSurreyKarting/Team Surrey Karting Club Logo (Not Square).svg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </div>
            </ div>
        </div>
    );
}