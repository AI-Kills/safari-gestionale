"use client";
import { PowerIcon } from "@heroicons/react/16/solid";
import { _signOut } from "@/app/lib/actions/actions";
import clsx from 'clsx';

export default function SignOut({ isCollapsed }: { isCollapsed: boolean }) {

  const handleSignOut = async () => {
    await _signOut();
  }
  
  return (
    <button
      onClick={handleSignOut}
      className={clsx(
        "flex h-[48px] items-center rounded-md bg-white p-3 text-sm text-brown-500 font-medium hover:bg-brown-500 hover:text-white transition-all duration-200 group relative",
        {
          'justify-center': isCollapsed,
          'justify-start gap-2': !isCollapsed,
        }
      )}
      title={isCollapsed ? "Sign Out" : undefined}
    >
      <PowerIcon className="w-6 flex-shrink-0" />
      <span className={clsx(
        'transition-all duration-300 whitespace-nowrap',
        {
          'opacity-0 w-0 overflow-hidden': isCollapsed,
          'opacity-100 w-auto': !isCollapsed,
        }
      )}>
        Sign Out
      </span>
      
      {/* Tooltip per stato collapsed */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          Sign Out
        </div>
      )}
    </button>
  );
}