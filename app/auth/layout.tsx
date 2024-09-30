import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Surrey Karting Club",
  description: "Team Surrey Karting Club is the University of Surrey's Karting Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
