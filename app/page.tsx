import { ArrowRightIcon, SparklesIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brown-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo-verde.jpg"
              alt="Impronte Safari Logo"
              width={200}
              height={80}
              className="object-contain"
              priority
            />
            <Badge variant="secondary" className="hidden md:flex">
              v3.0.0
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Gestionale
                <span className="block text-green-600">
                  Impronte Safari
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Sistema completo per la gestione di clienti, preventivi e voli.
                Semplifica il tuo lavoro con un'interfaccia moderna e intuitiva.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/login" className="flex items-center gap-3">
                  <span>Accedi al Dashboard</span>
                  <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/signup">
                  Registrati
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-brown-400 rounded-3xl blur-3xl opacity-20"></div>
            <Image
              src="/giraffa.jpg"
              width={600}
              height={600}
              className="relative rounded-3xl shadow-2xl"
              alt="Giraffe Impronte Safari"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <UserGroupIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gestione Clienti
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Organizza e gestisci tutti i tuoi clienti in un unico posto con
              informazioni dettagliate e storico completo.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center mb-6">
              <ChartBarIcon className="w-6 h-6 text-brown-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Preventivi Intelligenti
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Crea preventivi professionali con calcoli automatici e
              personalizzazioni avanzate per ogni tipo di viaggio.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <SparklesIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Automazione Avanzata
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Automatizza i processi ripetitivi e concentrati su ciò che
              conta davvero: offrire esperienze di viaggio uniche.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            © 2025 Impronte Safari. Sistema di gestione per agenzie di viaggio.
          </p>
        </div>
      </div>
    </main>
  );
}
