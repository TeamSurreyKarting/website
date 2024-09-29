import "@/app/globals.scss";
import { Inter } from "next/font/google";
import Nav from "@/app/components/admin/nav";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: {
    template: '%s - Team Surrey Karting Admin Dashboard',
    default: 'Team Surrey Karting Admin Dashboard',
  },
};

// export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden dark:bg-slate-800 dark:text-white">
                    <div className="w-full flex-none md:w-64">
                        <Nav />
                    </div>
                    <div className="flex-grow m-4 overflow-y-auto md:p-12 rounded-md">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}