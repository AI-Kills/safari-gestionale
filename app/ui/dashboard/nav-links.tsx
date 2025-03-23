'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  GlobeEuropeAfricaIcon,
  CurrencyEuroIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
}
export default function NavLinks({links}: {links: NavLink[]}) {

  const pathName = usePathname();
  
  return (
    <>
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center text-brown-500 justify-center gap-2 rounded-md bg-brown-400 p-3 text-sm font-medium hover:bg-white hover:text-brown-500 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-white text-brown-500': pathName === link.href,
              },
            )}
          >
            {link.icon && link.icon}
            {!link.icon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
