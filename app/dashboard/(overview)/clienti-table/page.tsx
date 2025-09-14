import { getAllClienti, searchClienti } from "@/app/lib/actions";
import { TableClienti } from "@/app/ui/table-wrapper/table-wrapper-clienti";
import { Suspense } from "react";

interface PageProps {
  searchParams?: {
    search?: string;
  };
}

async function ClientiData({ searchTerm }: { searchTerm?: string }) {
  try {
    let clienti;
    
    if (searchTerm && searchTerm.trim().length > 0) {
      // Usa ricerca server-side se c'è un termine di ricerca
      const searchData = {
        nome: searchTerm,
        cognome: searchTerm,
        email: searchTerm,
      };
      const result = await searchClienti(searchData);
      
      if (result.success) {
        clienti = result.values || [];
      } else {
        throw new Error(result.errorsMessage || 'Errore nella ricerca clienti');
      }
    } else {
      // Carica tutti i clienti se non c'è ricerca
      clienti = await getAllClienti();
    }

    return <TableClienti data={clienti} />;
  } catch (error) {
    console.error('Errore nel caricamento clienti:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          Errore nel caricamento dei clienti: {error instanceof Error ? error.message : 'Errore sconosciuto'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Riprova a ricaricare la pagina
        </p>
      </div>
    );
  }
}

function ClientiLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
    </div>
  );
}

export default async function Page({ searchParams }: PageProps) {
  const searchTerm = searchParams?.search;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">TABELLA CLIENTI</h1>
        {searchTerm && (
          <p className="text-sm text-gray-600">
            Risultati per: "{searchTerm}"
          </p>
        )}
      </div>
      
      <Suspense fallback={<ClientiLoading />}>
        <ClientiData searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}
