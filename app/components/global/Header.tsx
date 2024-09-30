import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";

export default function Header() {
    return (
        <div className="z-40 inset-0 h-fit bg-transparent">
            <MobileHeader />
            <div className={"hidden lg:flex justify-between items-center p-4 bg-primary"}>
                <div>
                    <Image
                        src="/TeamSurreyKarting/Team Surrey Karting Club Logo (Not Square).svg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </div>
                <nav className='flex items-right gap-4'>
                    <Link href="/about">About</Link>
                    <Link href="/bukc">BUKC</Link>
                    <Link href="/race-league">Race League</Link>
                    <Link href="/socials">Socials</Link>
                </nav>
            </ div>
        </div>
    );
}