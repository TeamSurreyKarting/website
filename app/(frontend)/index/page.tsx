import Image from "next/image";
import Hero from "@/app/components/ui/Hero";
import Card from "@/app/components/ui/Card";

export default function Home() {
    return (
        <main className="">
            <Hero>
                <div className="flex flex-col">
                    <Image
                        src="/TeamSurreyKarting/Team Surrey Karting Club Logo (Not Square).svg"
                        alt="Logo"
                        width={400}
                        height={400}
                    />
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="font-medium text-xl text-center text-white">Surrey&apos;s Home For Motorsports</p>
                </div>
            </Hero>
            <div className="flex flex-col gap-5 ">
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 mx-10 my-8 mb-24">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Team Surrey Karting is the University of Surrey&apos;s official karting club. We are a group of
                            students passionate about motorsports and karting. We aim to provide a space for students to come and participate in karting events, socials and competitions.
                            Allowing students to have fun and compete in a friendly environment with people who share a similar passion for motorsports.
                        </p>

                        <button className="bg-lightning-gold-400 w-32 text-center px-5 py-4 rounded-lg mt-5 font-semibold transition-colors hover:bg-nile-blue-100 ">
                            Join Now!
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image
                            src="/images/BUKC/2.jpg"
                            alt="Team Surrey Karting"
                            width={400}
                            height={400}
                            className="rounded-lg shadow-xl object-cover"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-white mb-4 text-center">What We Offer</h2>
                </div>


                <div className="mx-10 flex justify-center ">

                    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-20 gap-10 justify-center">
                        <Card title="BUKC" imageSrc="/images/BUKC/5.jpg"
                              text="The British Universities Karting Championship is the UK's karting championship for students."
                              link="/bukc"/>
                        <Card title="Socials" imageSrc="/images/BUKC/2.jpg"
                              text="The club offers a range of socials throughout the year, including karting sessions and watch parties."
                              link="/socials"/>
                        <Card title="Leaderboard" imageSrc="/images/BUKC/3.jpg"
                              text="The clubs leaderboard. Compete with other members to be the best!"
                              link="/leaderboard"/>
                        {/*We visit a range of tracks across the UK, including TeamSports Farnborough, Daytona Sandown Park and TeamSport Crawley.*/}
                    </div>
                </div>
            </div>
        </main>
    );
}
