'use client';

import { useSidebar } from '@/app/context/sidebar-context';
import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { isHovered, isMobile } = useSidebar();

  return (
    <div
      className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
        ${isMobile ? 'ml-0' : isHovered ? 'ml-0' : 'ml-0'}
      `}
      style={{
        marginLeft: isMobile ? '0' : isHovered ? '0' : '0'
      }}
    >
      <div className="flex-1 overflow-y-auto pt-6 bg-gray-50">
        <div className={`
          max-w-full transition-all duration-300 ease-in-out px-1
        `}>
          {children}
        </div>
      </div>
    </div>
  );
}
