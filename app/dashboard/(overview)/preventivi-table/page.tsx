import { getAllPreventivi } from "@/app/lib/actions";
import { Preventivo } from "@/app/lib/definitions";
import { Cliente } from "@/app/lib/definitions";
import { STable } from "@/app/ui/table/table";
import { Suspense } from "react";

type PreventivoWithCliente = Preventivo & { cliente: Cliente };

interface PageProps {
  searchParams?: {
    search?: string;
  };
}

async function PreventiviData({ searchTerm }: { searchTerm?: string }) {
  try {
    const preventivi = await getAllPreventivi();
    
    // Processa i dati anche se l'array è vuoto
    const rows = preventivi.map((p: PreventivoWithCliente) => {
      const { cliente, ...preventivo } = p;
      const flattenedObject = {
        ...cliente,
        ...preventivo
      };

      // Nomi campi corretti allineati al database
      const columnsToShow = [
        'nome',
        'cognome', 
        'tel', // Corretto: era 'telefono'
        'email',
        'destinazione',
        'note',
        'note_operative',
        'adulti',
        'bambini',
        'data_partenza',
        'operatore',
        'stato',
        'data', // Corretto: era 'data_preventivo'
        'numero_preventivo'
      ];

      return Object.fromEntries(
        Object.entries(flattenedObject)
          .filter(([key, value]) => {
            return !key.includes('id') && columnsToShow.includes(key);
          })
          .map(([key, value]) => {
            if (value instanceof Date) {
              return [key, value.toLocaleDateString()];
            }
            return [key, value];
          })
      );
    });

    return <STable data={rows} columnsSize={200} />;
  } catch (error) {
    console.error('Errore nel caricamento preventivi:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          Errore nel caricamento dei preventivi: {error instanceof Error ? error.message : 'Errore sconosciuto'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Riprova a ricaricare la pagina
        </p>
      </div>
    );
  }
}

function PreventiviLoading() {
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
        <h1 className="text-xl md:text-2xl font-semibold">TABELLA PREVENTIVI</h1>
        {searchTerm && (
          <p className="text-sm text-gray-600">
            Risultati per: "{searchTerm}"
          </p>
        )}
      </div>
      
      <Suspense fallback={<PreventiviLoading />}>
        <PreventiviData searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}