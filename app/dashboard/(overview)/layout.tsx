import SideNav from '@/app/ui/dashboard/sidenav';
import MainContent from '@/app/ui/dashboard/main-content';
import { Suspense } from 'react';
import Loading from './loading';
import { CogIcon, DocumentDuplicateIcon, MagnifyingGlassIcon, PlusIcon, TableCellsIcon, UsersIcon } from '@heroicons/react/24/outline';
import { SpinnerContextProvider } from '@/app/context/spinner-context';
import { SidebarProvider } from '@/app/context/sidebar-context';
import { ToastProvider } from '@/components/ui/use-toast';
import { SessionProvider } from 'next-auth/react';

export default async function Layout({ children }: { children: React.ReactNode }) {

  // Map of links to display in the side navigation.
  const links = [
    { name: 'Preventivo', href: '/dashboard/general-interface' },
    { name: 'Preventivi', href: '/dashboard/preventivi-table', icon: <TableCellsIcon className="w-6" /> },
    { name: 'Clienti', href: '/dashboard/clienti-table', icon: <TableCellsIcon className="w-6" /> },
    { name: 'Contratto', href: '/dashboard/contratto', icon: <DocumentDuplicateIcon className="w-6" /> },
    { name: 'Aggiungi', href: '/dashboard/aggiungi', icon: <PlusIcon className="w-6" /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <CogIcon className="w-6" /> },
    { name: 'Changelog', href: '/dashboard', icon: <DocumentDuplicateIcon className="w-6" /> },
  ];

  return (
    <SpinnerContextProvider>
      <SessionProvider>
        <ToastProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              <SideNav links={links} />
              <Suspense fallback={<Loading />}>
                <MainContent>{children}</MainContent>
              </Suspense>
            </div>
          </SidebarProvider>
        </ToastProvider>
      </SessionProvider>
    </SpinnerContextProvider>
  );
}
