import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/app/components/global/Header";
import Footer from "@/app/components/global/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Surrey Karting",
  description: "Team Surrey Karting is a student-led karting team at the University of Surrey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
