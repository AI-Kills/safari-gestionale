import { getCliente } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Edit, User } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ClientePage({ params }: PageProps) {
  const cliente = await getCliente(params.id);

  if (!cliente) {
    notFound();
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Non specificato";
    return new Date(date).toLocaleDateString("it-IT");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clienti-table">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla lista
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User className="w-6 h-6" />
              {cliente.cognome} {cliente.nome}
            </h1>
            <p className="text-gray-600">{cliente.email}</p>
          </div>
        </div>
        <Link href={`/dashboard/clienti-table/${params.id}/edit`}>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Modifica
          </Button>
        </Link>
      </div>

      {/* Informazioni principali */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni Personali</CardTitle>
          <CardDescription>Dati anagrafici del cliente</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Nome Completo</label>
            <p className="text-lg">{cliente.cognome} {cliente.nome}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p>{cliente.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Telefono</label>
            <p>{cliente.tel || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Tipo Cliente</label>
            <div className="mt-1">
              <Badge variant={cliente.tipo === "PRIVATO" ? "default" : "secondary"}>
                {cliente.tipo || "Non specificato"}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Sesso</label>
            <p>{cliente.sesso || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Data di Nascita</label>
            <p>{formatDate(cliente.data_di_nascita)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Indirizzo */}
      <Card>
        <CardHeader>
          <CardTitle>Indirizzo</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Indirizzo</label>
            <p>{cliente.indirizzo || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">CAP</label>
            <p>{cliente.cap || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Città</label>
            <p>{cliente.citta || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Provincia</label>
            <p>{cliente.provincia || "Non specificato"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documenti */}
      <Card>
        <CardHeader>
          <CardTitle>Documenti</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Codice Fiscale</label>
            <p>{cliente.cf || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Luogo di Nascita</label>
            <p>{cliente.luogo_nascita || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Provincia di Nascita</label>
            <p>{cliente.provincia_nascita || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Nazionalità</label>
            <p>{cliente.nazionalita || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Numero Passaporto</label>
            <p>{cliente.numero_passaporto || "Non specificato"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Scadenza Passaporto</label>
            <p>{formatDate(cliente.data_scadenza_passaporto)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Informazioni commerciali */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni Commerciali</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Provenienza</label>
            <div className="mt-1">
              <Badge variant="outline">
                {cliente.provenienza || "Non specificato"}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Collegato a</label>
            <p>{cliente.collegato || "Non specificato"}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-500">Note</label>
            <p className="mt-1 p-3 bg-gray-50 rounded-md min-h-[60px]">
              {cliente.note || "Nessuna nota"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preventivi del cliente */}
      {cliente.preventivi && cliente.preventivi.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preventivi ({cliente.preventivi.length})</CardTitle>
            <CardDescription>Preventivi associati a questo cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cliente.preventivi.map((preventivo: any) => (
                <div key={preventivo.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#{preventivo.numero_preventivo}</p>
                    <p className="text-sm text-gray-600">
                      {preventivo.destinazione} - {preventivo.operatore}
                    </p>
                  </div>
                  <Badge variant={preventivo.stato === "confermato" ? "default" : "secondary"}>
                    {preventivo.stato}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
