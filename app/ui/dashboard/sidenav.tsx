
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SignOut from './signout';
import { lusitana } from '../fonts';
import Image from 'next/image';
import { NavLink } from './nav-links';
import './sidenav.styles.css';


export default function SideNav({ links }: { links: NavLink[] }) {
  return (
    <div className="bg-brown-400 flex h-screen flex-col px-3 py-4 md:px-2 sidenav">
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:mt-36">
        <Image className='sidenav__logo' src="/logoTondo.png" alt="logo" width={130} height={130} />
        <NavLinks links={links} />
        <SignOut />
      </div>
    </div>
  );
}
