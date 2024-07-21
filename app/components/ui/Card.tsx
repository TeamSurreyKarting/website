import Image from "next/image";

//@ts-ignore
export default function Card({ title, imageSrc, text, link }) {
    return (
        <div className="relative bg-nile-blue-200 rounded-lg overflow-hidden shadow-lg h-96 w-80 aspect-2/3">

            <div className="absolute inset-0">
                <Image
                    src={imageSrc}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-40"
                />
            </div>

            <div className="relative p-4 flex flex-col justify-between h-full bg-gradient-to-t from-black to-transparent">

                <div className="absolute top-0 left-0 right-0 bg-lightning-gold-600 bg-opacity-60 text-white p-2">
                    <h2 className="text-lg font-bold">{title}</h2>
                </div>

                <div className="mt-16 mb-8 text-white">
                    <p>{text}</p>
                </div>

                <div className="absolute bottom-4 right-4">
                    <a
                        href={link}
                        className="bg-lightning-gold-600 text-white py-2 px-4 rounded-lg hover:bg-lightning-gold-500"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    );
}
