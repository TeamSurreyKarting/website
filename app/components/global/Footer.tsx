'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const developmentYear = 2024;
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const copyrightRange = useMemo(() => {
        return currentYear === developmentYear
            ? `${developmentYear}`
            : `${developmentYear} - ${currentYear}`;
    }, [currentYear, developmentYear]);

    return (
        <div className="z-40 h-fit md:px-40 px-10 w-full pt-5 mt-4 bg-black bg-opacity-10">

            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-10">

                <div className="flex flex-col gap-5 md:text-left text-center">

                    <div>
                        <h3 className="text-xl font-extrabold text-nile-blue-400">Team Surrey Karting Club</h3>
                        <p className="text-nile-blue-200 text-sm font-semibold my-2">
                            <a
                                href="mailto:ussu.karting@surrey.ac.uk"
                            >
                                ussu.karting@surrey.ac.uk
                            </a>
                        </p>
                    </div>
                    <div className="flex md:flex-row flex-col items-center  gap-5">
                        <Image
                            src="/StudentUnion/SSU_Logo_H_Left_White.svg"
                            alt="SSU"
                            width={100}
                            height={100}
                        />
                        <Image
                            src="/TeamSurrey/ts-text-only-gold.svg"
                            alt="TeamSurrey"
                            width={100}
                            height={100}
                        />
                        <Image
                            src="/BUKC/bukc-white.svg"
                            alt="BUKC"
                            width={100}
                            height={100}
                        />
                    </div>


                </div>


                <div className="flex flex-col md:text-right text-center gap-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-nile-blue-400">Information</h3>
                        <Link href="#"
                              className="text-sm font-semibold text-cyan-400 transition-colors hover:text-nile-blue-200">Privacy
                            Policy</Link>
                    </div>
                    <div>
                        <h4 className="text-md font-extrabold text-nile-blue-400">Found A Major Issue?</h4>
                        <p className="text-sm font-semibold text-nile-blue-100">Contact The Project Lead</p>
                        <Link href="https://aranjannson.com/" target="_blank"
                              className="text-sm font-semibold text-cyan-400 transition-colors hover:text-nile-blue-200">aranjannson.com</Link>
                    </div>
                </div>

            </div>

            <div className="flex justify-center items-center p-4 bg-primary">
                <div className="text-nile-blue-200 font-semibold text-center">
                    <p>
                        Copyright © {copyrightRange} Team Surrey Karting. All rights reserved.
                    </p>
                </div>
            </div>

        </div>
    );
}