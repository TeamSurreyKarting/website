'use client';

import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaHome, FaThList, FaFlagCheckered, FaCalendar } from "react-icons/fa";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import IconBUKC from "@/app/components/icons/BUKC";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: 'Home',
        href: '/admin',
        icon: FaHome,
    },
    {
        name: 'Racers',
        href: '/admin/racers',
        icon: GiFullMotorcycleHelmet
    },
    {
        name: 'Tracks',
        href: '/admin/tracks',
        icon: FaFlagCheckered
    },
    {
        name: 'Leagues',
        href: '/admin/leagues',
        icon: FaThList,
    },
    // {
    //   name: 'BUKC',
    //   href: '/admin/bukc',
    //   icon: IconBUKC
    // }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        const isCurrentPath = pathname === link.href;
        const containsCurrentPath = (pathname.startsWith(link.href) && link.href !== '/admin') || (link.href === '/admin' && pathname === link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => {
              if (isCurrentPath) {
                e.preventDefault();
              }
            }}
            className={clsx(
              "flex h-[56px] grow items-center justify-center gap-4 rounded-lg p-3 text-sm font-medium hover:bg-lightning-gold-300 hover:text-gray-500 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-lightning-gold-400 text-black': containsCurrentPath,
                'bg-nile-blue-900 text-white': !containsCurrentPath,
              }
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
