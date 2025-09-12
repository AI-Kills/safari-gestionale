'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SignOut from './signout';
import { lusitana } from '../fonts';
import Image from 'next/image';
import { NavLink } from './nav-links';
import './sidenav.styles.css';
import { useSidebar } from '@/app/context/sidebar-context';

export default function SideNav({ links }: { links: NavLink[] }) {
  const { isHovered, setIsHovered, isMobile } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isHovered && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsHovered(false)}
        />
      )}
      
      <div 
        className={`bg-brown-400 flex h-screen flex-col px-3 py-4 md:px-2 sidenav transition-all duration-300 ease-in-out ${
          isHovered ? 'sidenav--expanded' : 'sidenav--collapsed'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isMobile ? 50 : 'auto' }}
      >
        {/* Mobile toggle button */}
        {isMobile && !isHovered && (
          <button
            className="fixed top-4 left-4 z-50 bg-brown-400 text-white p-2 rounded-md shadow-lg md:hidden"
            onClick={() => setIsHovered(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div className="flex grow flex-col space-y-2">
          <div className="sidenav__logo-container">
            <Image 
              className='sidenav__logo' 
              src="/logoTondo.png" 
              alt="logo" 
              width={80} 
              height={80} 
            />
          </div>
          
          <div className="flex-1">
            <NavLinks links={links} isCollapsed={!isHovered} />
          </div>
          
          <div className="mt-auto">
            <SignOut isCollapsed={!isHovered} />
          </div>
        </div>
      </div>
    </>
  );
}
