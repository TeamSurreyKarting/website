'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    const handleMenuOpen = () => {
        console.debug('open menu');
        setIsMenuOpen(true);
    }

    const handleMenuClose = () => {
        console.debug('close menu');
        setIsMenuOpen(false);
    }

    return (
        <>
            <div id="mobile-nav" className={'flex lg:hidden justify-between items-center p-2 bg-primary'}>
                <button onClick={handleMenuOpen}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={'w-8 aspect-square'}>
                        <path d="M4 18H10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 12L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
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
            <div id="mobile-nav-drawer-backdrop" className={clsx(
                'fixed inset-0 bg-black bg-opacity-50 z-40',
                isMenuOpen ? 'block' : 'hidden'
            )} onClick={handleMenuClose}></div>
            <div id="mobile-nav-drawer" className={clsx(
                'fixed inset-0 bg-nile-blue-900 text-text z-50 transform transition-transform duration-300 p-4',
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            )}>
                <button onClick={handleMenuClose}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={'w-8 aspect-square'}>
                        <path d="M6 18L18 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M6 6L18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                <nav className='mt-4 flex flex-col gap-4'>
                    <Link href="/about">About</Link>
                    <Link href="/bukc">BUKC</Link>
                    <Link href="/race-league">Race League</Link>
                    <Link href="/socials">Socials</Link>
                </nav>
            </div>
        </>
    );
}