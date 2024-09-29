import Image from "next/image";

export default function BUKC() {
    return(

        <div className="md:mx-5 mx-3 flex flex-col md:gap-0 gap-5">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-4">BUKC</h1>

                    <p className="text-xl font-bold text-nile-blue-200">Compete For Surrey! </p>

                    <div className="my-5">
                        <h2 className="text-lg font-extrabold text-white mb-4">What is BUKC?</h2>
                        <p className="text-white">The British University Karting Championship (BUKC) is the UK&apos;s national university karting
                            championship.
                            It is a championship that brings teams from universities across the UK together inorder
                            compete in a series of races at circuits around the country.
                            The championship is open to all students with a passion and enjoyment for motorsports.
                        </p>
                    </div>
                </div>
                <div className="w-full">

                    <Image
                        src="/images/BUKC/10.jpg"
                        alt="Team Surrey Karting"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-xl object-cover w-full"
                    />
                </div>

            </div>

            <div>
                <h1 className="text-3xl font-extrabold text-white mb-4">How to Join</h1>

                <p className="text-white">In order to participate you must hold a valid Competitive Membership for the society as well as a Team Surrey Membership.
                Once you have these memberships you can sign up for the BUKC trials, these trials are held at the start of the academic year and are used to select the drivers that will represent Team Surrey in the championship.
                To book a slot for the trials, you can contact us via <a href="mailto:ussu.karting@surrey.ac.uk" className="text-gray-300 transition-colors hover:text-nile-blue-300">Email</a> or via our socials.
                </p>
            </div>


        </div>

    );
}