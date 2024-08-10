import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";
import NextAuthProvider from "@/app/components/auth/NextAuthProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Team Surrey Karting",
    description: "Admin Panel for Team Surrey Karting.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NextAuthProvider>
            <Header/>

            {children}

            <Footer/>
        </NextAuthProvider>
        </body>
        </html>
    );
}
