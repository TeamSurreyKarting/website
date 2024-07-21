import Image from "next/image";

// @ts-ignore
export default function Hero({ children }) {
    return (
        <div className="w-full h-[21rem] overflow-hidden relative border-b-4 border-lightning-gold-500">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
                {children}
            </div>
            <Image
                src="/images/BUKC/1.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
        </div>
    );
}
