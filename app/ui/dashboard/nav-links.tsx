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

export default function NavLinks({ links, isCollapsed }: { links: NavLink[], isCollapsed: boolean }) {
  const pathName = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center text-brown-500 rounded-md bg-brown-400 p-2 text-sm font-medium hover:bg-white hover:text-brown-500 transition-all duration-200 relative group',
              {
                'bg-white text-brown-500': pathName === link.href,
                'justify-center': isCollapsed,
                'justify-start gap-3': !isCollapsed,
              },
            )}
            title={isCollapsed ? link.name : undefined}
          >
            <div className="flex-shrink-0">
              {link.icon && link.icon}
              {!link.icon && <LinkIcon className="w-6" />}
            </div>
            <span className={clsx(
              'transition-all duration-300 whitespace-nowrap',
              {
                'opacity-0 w-0 overflow-hidden': isCollapsed,
                'opacity-100 w-auto': !isCollapsed,
              }
            )}>
              {link.name}
            </span>
            
            {/* Tooltip per stato collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {link.name}
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
}
