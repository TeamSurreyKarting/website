import Image from 'next/image';
import Link from 'next/link';
import NavLinks from '@/app/components/admin/navlinks';
import SignOutButton from './SignOutButton';

export default function Nav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link href="/" className="hidden md:block flex items-center gap-2">
          <Image src="/TeamSurreyKarting/Team Surrey Karting Club Logo.svg" alt="Team Surrey Karting Club" width={500} height={32} className='w-full h-auto object-fill' />
        </Link>
        <NavLinks />
        <div className="hidden md:block h-auto w-full grow rounded-md bg-none"></div>
        <SignOutButton />
      </div>
    </div>
  );
}
