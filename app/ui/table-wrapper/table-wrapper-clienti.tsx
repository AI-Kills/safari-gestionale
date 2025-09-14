"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleX,
  Columns3,
  Filter,
  ListFilter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Save,
  X,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Cliente } from "@/app/lib/definitions";
import { deleteCliente, updateCliente } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import Modal from "@/app/ui/modal";
import InputText from "@/app/ui/inputs/input-text";
import InputEmail from "@/app/ui/inputs/input-email";
import InputTell from "@/app/ui/inputs/input-tell";
import InputDate from "@/app/ui/inputs/input-date";
import InputSelect from "@/app/ui/inputs/input-select";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Cliente> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.nome} ${row.original.cognome} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Helper per formattare le date
const formatDateForInput = (date: Date | string | null): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

const columns: ColumnDef<Cliente>[] = [
  {
    header: "Nome",
    accessorKey: "nome",
    cell: ({ row }) => <div className="font-medium">{row.getValue("nome")}</div>,
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Cognome",
    accessorKey: "cognome",
    size: 220,
    filterFn: multiColumnFilterFn,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div>
        <span className="text-lg leading-none">{row.original.email}</span>
      </div>
    ),
    size: 300,
    filterFn: multiColumnFilterFn,
  },
  {
    header: "Tipo",
    accessorKey: "tipo",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("tipo") === "PRIVATO" ? "default" : "secondary"}
      >
        {row.getValue("tipo")}
      </Badge>
    ),
    size: 150,
  },
  {
    header: "Telefono", 
    accessorKey: "tel",
    size: 160,
  },
  {
    header: "Indirizzo",
    accessorKey: "indirizzo",
    size: 300,
  },
  {
    header: "CAP",
    accessorKey: "CAP",
    size: 100,
  },
  {
    header: "Città",
    accessorKey: "citta",
    size: 200,
  },
  {
    header: "Provincia",
    accessorKey: "provincia",
    size: 100,
  },
  {
    header: "Codice Fiscale",
    accessorKey: "CF",
    size: 200,
  },
  {
    header: "Provenienza",
    accessorKey: "provenienza",
    cell: ({ row }) => (
      <Badge>
        {row.getValue("provenienza")}
      </Badge>
    ),
    size: 200
  },
  {
    header: "Collegato a",
    accessorKey: "collegato",
    size: 150,
  },
  {
    header: "Data di Nascita",
    accessorKey: "data_di_nascita",
    cell: ({ row }) => row.getValue("data_di_nascita") ? new Date(row.getValue("data_di_nascita")).toLocaleDateString() : "",
    size: 120,
  },
  {
    header: "Luogo Nascita",
    accessorKey: "luogo_nascita",
    size: 150,
  },
  {
    header: "Prov. Nascita",
    accessorKey: "provincia_nascita",
    size: 120,
  },
  {
    header: "N° Passaporto",
    accessorKey: "numero_passaporto",
    size: 140,
  },
  {
    header: "Scadenza Passaporto",
    accessorKey: "data_scadenza_passaporto",
    cell: ({ row }) => row.getValue("data_scadenza_passaporto") ? new Date(row.getValue("data_scadenza_passaporto")).toLocaleDateString() : "",
    size: 160,
  },
  {
    header: "Nazionalità",
    accessorKey: "nazionalita",
    size: 130,
  },
  {
    header: "Sesso",
    accessorKey: "sesso",
    size: 80,
  },
  {
    header: "Note",
    accessorKey: "note",
    size: 200,
  },
  {
    id: "actions",
    header: "Azioni",
    cell: ({ row }) => <ClienteActions cliente={row.original} />,
    size: 120,
    enableHiding: false,
  }
];

// Componente per le azioni sui clienti con modale di modifica
function ClienteActions({ cliente }: { cliente: Cliente }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedCliente, setEditedCliente] = useState<Cliente>(cliente);

  // Opzioni per i dropdown
  const provenienzaOptions = [
    'Passaparola',
    'Sito IWS',
    'Sito INO',
    'Telefono',
    'Email Diretta',
    'Sito ISE',
    'Sito IMS'
  ];

  const tipoOptions = ['PRIVATO', 'AGENZIA VIAGGI', 'AZIENDA'];
  const sessoOptions = ['M', 'F'];

  const handleView = () => {
    router.push(`/dashboard/clienti-table/${cliente.id}`);
  };

  const handleEditClick = () => {
    setEditedCliente(cliente);
    setShowEditModal(true);
  };

  const handleInputChange = (field: keyof Cliente, value: any) => {
    setEditedCliente(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    setIsUpdating(true);
    try {
      const result = await updateCliente(editedCliente);
      if (result.success) {
        setShowEditModal(false);
        // Ricarica la pagina per vedere le modifiche
        window.location.reload();
      } else {
        alert(`Errore durante l'aggiornamento: ${result.errorsMessage || 'Errore sconosciuto'}`);
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento:', error);
      alert('Errore durante l\'aggiornamento del cliente');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Sei sicuro di voler eliminare il cliente ${cliente.cognome} ${cliente.nome}?\n\nQuesta azione non può essere annullata.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteCliente(cliente.id);
      if (result.success) {
        // Ricarica la pagina per vedere le modifiche
        window.location.reload();
      } else {
        alert('Errore durante l\'eliminazione del cliente');
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione:', error);
      alert('Errore durante l\'eliminazione del cliente');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Apri menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Azioni</DropdownMenuLabel>
          <button
            onClick={handleView}
            className="w-full px-2 py-1.5 text-sm text-left hover:bg-accent flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Visualizza
          </button>
          <button
            onClick={handleEditClick}
            className="w-full px-2 py-1.5 text-sm text-left hover:bg-accent flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Modifica
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full px-2 py-1.5 text-sm text-left hover:bg-accent flex items-center gap-2 text-red-600 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Eliminazione...' : 'Elimina'}
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modale di Modifica */}
      <Modal
        showModal={showEditModal}
        dark={false}
        header={
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Modifica Cliente: {cliente.cognome} {cliente.nome}
            </h2>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        }
        body={
          <div className="max-h-96 overflow-y-auto text-gray-800">
            <div className="space-y-4">
              {/* Informazioni Base */}
              <div className="grid grid-cols-2 gap-4">
                <InputText
                  label="Nome"
                  name="nome"
                  value={editedCliente.nome || ''}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                />
                <InputText
                  label="Cognome"
                  name="cognome"
                  value={editedCliente.cognome || ''}
                  onChange={(e) => handleInputChange('cognome', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputEmail
                  label="Email"
                  name="email"
                  value={editedCliente.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <InputTell
                  label="Telefono"
                  name="tel"
                  value={editedCliente.tel || ''}
                  onChange={(e) => handleInputChange('tel', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <InputSelect
                  label="Tipo"
                  name="tipo"
                  options={tipoOptions}
                  value={editedCliente.tipo || ''}
                  onChange={(e) => handleInputChange('tipo', e.target.value)}
                />
                <InputSelect
                  label="Sesso"
                  name="sesso"
                  options={sessoOptions}
                  value={editedCliente.sesso || ''}
                  onChange={(e) => handleInputChange('sesso', e.target.value)}
                />
                <InputSelect
                  label="Provenienza"
                  name="provenienza"
                  options={provenienzaOptions}
                  value={editedCliente.provenienza || ''}
                  onChange={(e) => handleInputChange('provenienza', e.target.value)}
                />
              </div>

              {/* Indirizzo */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Indirizzo</h3>
                <InputText
                  label="Indirizzo"
                  name="indirizzo"
                  value={editedCliente.indirizzo || ''}
                  onChange={(e) => handleInputChange('indirizzo', e.target.value)}
                />
                <div className="grid grid-cols-3 gap-4">
                  <InputText
                    label="CAP"
                    name="cap"
                    value={editedCliente.cap || ''}
                    onChange={(e) => handleInputChange('cap', e.target.value)}
                  />
                  <InputText
                    label="Città"
                    name="citta"
                    value={editedCliente.citta || ''}
                    onChange={(e) => handleInputChange('citta', e.target.value)}
                  />
                  <InputText
                    label="Provincia"
                    name="provincia"
                    value={editedCliente.provincia || ''}
                    onChange={(e) => handleInputChange('provincia', e.target.value)}
                  />
                </div>
              </div>

              {/* Dati Anagrafici */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Dati Anagrafici</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InputDate
                    label="Data di Nascita"
                    name="data_di_nascita"
                    value={formatDateForInput(editedCliente.data_di_nascita)}
                    onChange={(e) => handleInputChange('data_di_nascita', new Date(e.target.value))}
                  />
                  <InputText
                    label="Codice Fiscale"
                    name="cf"
                    value={editedCliente.cf || ''}
                    onChange={(e) => handleInputChange('cf', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputText
                    label="Luogo di Nascita"
                    name="luogo_nascita"
                    value={editedCliente.luogo_nascita || ''}
                    onChange={(e) => handleInputChange('luogo_nascita', e.target.value)}
                  />
                  <InputText
                    label="Provincia Nascita"
                    name="provincia_nascita"
                    value={editedCliente.provincia_nascita || ''}
                    onChange={(e) => handleInputChange('provincia_nascita', e.target.value)}
                  />
                </div>
                <InputText
                  label="Nazionalità"
                  name="nazionalita"
                  value={editedCliente.nazionalita || ''}
                  onChange={(e) => handleInputChange('nazionalita', e.target.value)}
                />
              </div>

              {/* Passaporto */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Passaporto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InputText
                    label="Numero Passaporto"
                    name="numero_passaporto"
                    value={editedCliente.numero_passaporto || ''}
                    onChange={(e) => handleInputChange('numero_passaporto', e.target.value)}
                  />
                  <InputDate
                    label="Scadenza Passaporto"
                    name="data_scadenza_passaporto"
                    value={formatDateForInput(editedCliente.data_scadenza_passaporto)}
                    onChange={(e) => handleInputChange('data_scadenza_passaporto', new Date(e.target.value))}
                  />
                </div>
              </div>

              {/* Informazioni Commerciali */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Informazioni Commerciali</h3>
                <InputText
                  label="Collegato"
                  name="collegato"
                  value={editedCliente.collegato || ''}
                  onChange={(e) => handleInputChange('collegato', e.target.value)}
                />
                <InputText
                  label="Note"
                  name="note"
                  textarea
                  value={editedCliente.note || ''}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                />
              </div>
            </div>
          </div>
        }
        buttons={
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              disabled={isUpdating}
              className="text-black border-gray-300 hover:bg-gray-50"
            >
              Annulla
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={isUpdating}
              className="flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </>
              )}
            </Button>
          </div>
        }
      />
    </>
  );
}

export default function TableClienti({ data }: { data: Cliente[] }) {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "nome",
      desc: false,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });


  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("tipo");

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn("tipo")?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("tipo");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("tipo")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("tipo")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("tipo")?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("tipo")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn("tipo")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };
  useEffect(() => { 
    console.log(' cd kjhgfd');
    (window as any).clienti = data;
    console.log(data);
  }, []);
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9",
                Boolean(table.getColumn("nome")?.getFilterValue()) && "pe-9",
              )}
              value={(table.getColumn("nome")?.getFilterValue() ?? "") as string}
              onChange={(e) => table.getColumn("nome")?.setFilterValue(e.target.value)}
              placeholder="Filtra per nome o cognome..."
              type="text"
              aria-label="Filter by name or email"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("nome")?.getFilterValue()) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("nome")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleX size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter
                  className="-ms-1 me-2 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Status
                {selectedStatuses.length > 0 && (
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground">Filters</div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {value}{" "}
                        <span className="ms-2 text-xs text-muted-foreground">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3
                  className="-ms-1 me-2 opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mostra/Nascondi colonne</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm">Non ci sono risultati</div>
                    <div className="text-xs">Prova a modificare i filtri o aggiungi nuovi elementi</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
          <p className="whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0,
                ),
                table.getRowCount(),
              )}
            </span>{" "}
            of <span className="text-foreground">{table.getRowCount().toString()}</span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Example of a more complex table made with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://tanstack.com/table"
          target="_blank"
          rel="noopener noreferrer"
        >
          TanStack Table
        </a>
      </p>
    </div>
  );
}

export { TableClienti }