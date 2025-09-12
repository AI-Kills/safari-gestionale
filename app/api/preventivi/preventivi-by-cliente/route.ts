// pages/api/check-client.ts
import { NextRequest, NextResponse } from 'next/server';
import { DBResult, fetchPreventiviByIdCliente } from '@/app/lib/actions/actions';
import { Preventivo } from '@/app/lib/definitions';

// get preventivi by cliente
export async function POST(request: NextRequest) {
        const  clienteId: string = await request.json();
        // Esegui la logica lato server qui
        const preventiviByClienteDBResult = await getPreventiviInputGroupByCliente(clienteId);
        console.log("Dato ricevuto nell'API route preventivi-by-cliente:", clienteId);
        console.log("Dato restituito dall'API route preventivi-by-cliente: ", preventiviByClienteDBResult);
        return NextResponse.json(preventiviByClienteDBResult);
}
const getPreventiviInputGroupByCliente = async (clienteId: string): Promise<DBResult<Preventivo[]>> => {
    const preventiviDBResult = await fetchPreventiviByIdCliente(clienteId);
    return preventiviDBResult;
  } 