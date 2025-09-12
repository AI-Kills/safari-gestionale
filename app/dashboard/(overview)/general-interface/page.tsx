'use client';
import InputTell from "@/app/ui/inputs/input-tell";
import InputText from "@/app/ui/inputs/input-text";
import InputSelect from "@/app/ui/inputs/input-select";
import InputNumber from "@/app/ui/inputs/input-number";
import InputEmail from "@/app/ui/inputs/input-email";
import InputDate from "@/app/ui/inputs/input-date";
import { InputLookup } from "@/app/ui/inputs/input-lookup";
import { useEffect, useState } from "react";
import fornitoriData from '@/app/lib/fundamental-entities-json/fornitori.json';
import destinazioniData from '@/app/lib/fundamental-entities-json/destinazioni.json';
import valuteValues from '@/app/seed/valute.json';
import brandValues from "@/app/seed/brands.json";
import operatoriValues from "@/app/seed/operatori.json";
import { ClienteInputGroup, PreventivoInputGroup, ServizioATerraInputGroup, VoloInputGroup, AssicurazioneInputGroup, Data, PreventivoAlClienteRow, PreventivoAlClienteInputGroup, Pagamento } from "./general-interface.defs";
import { formatDate, isValidEmail } from "@/app/lib/utils";
import { createCliente, DBResult, updateCliente } from "@/app/lib/actions/actions";
import { getTotServizio, getRicaricoServizio, getTotVolo, getTotAssicurazione, formatDateToString, getSommaTuttiTotEuro, validationErrorsToString, numberToExcelFormat, formatNumberItalian, isValidTel, dataErrors, errorTranslations } from "./helpers";
import { useSpinnerContext } from '@/app/context/spinner-context';
import { useDebouncedCallback } from 'use-debounce';
import moment from 'moment';
import Feedback from '@/app/ui/feedback/feedback';
import { Preventivo } from '@/app/lib/definitions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserIcon, DocumentTextIcon, PlusIcon, MinusIcon, CurrencyEuroIcon, CalendarIcon, BuildingOfficeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";


export default function CreaPreventivoGeneralInterface() {

  const { setIsActiveSpinner, isActiveSpinner } = useSpinnerContext(); // use context to set the spinner state

  // Extract the 'fornitori' and 'destinazioni' arrays from json
  // define the options for the input-selects
  const fornitoriOptions = fornitoriData.map(fornitore => fornitore.nome);
  const destinazioniOptions = destinazioniData.map(destinazione => destinazione.nome);
  const provenienzaOptions = [
    'Passaparola',
    'Sito IWS',
    'Sito INO',
    'Telefono',
    'Email Diretta',
    'Sito ISE',
    'Sito IMS'
  ]
  const statoOptions = [
    'da fare',
    'in trattativa',
    'confermato',
    'inviato'
  ]
  const tipoViaggioOptions = [
    { value: "viaggio_di_nozze", name: "viaggio di nozze" },
    { value: "viaggio_di_lavoro", name: "viaggio di lavoro" },
    { value: "altro", name: "altro" }
  ]
  const brandOptions = brandValues.brand;
  const operatoreOptions = operatoriValues.operatori;
  const valuteOptions = valuteValues.valute;
  // cliente che compare nel form
  const [cliente, setCliente] = useState<ClienteInputGroup>(new ClienteInputGroup());
  const [isSearchingClienti, setIsSearchingClienti] = useState<boolean>(false);
  const onVCCliente = async (e: any, name: string) => {
    //console.log('change in a value of a cliente <event, id, name>: ', e, name);
    setCliente((prevState) => {
      if (name == 'data_di_nascita') {
        const newDate = new Date(e.target.value);
        return { ...prevState, data_di_nascita: newDate };
      } else {
        return { ...prevState, [name]: e.target.value };
      }
    });
    debouncedSearchClienti();
  };
  const debouncedSearchClienti = useDebouncedCallback(async () => {
    setIsSearchingClienti(true);
    setShowClientiTrovati(false);
    setShowFormPreventivo(false);
    try {
      const clienti = await fetchClientiCorrispondenti();
      setClientiTrovati(clienti);
    } catch (error) {
      console.error('Errore durante la ricerca dei clienti:', error);
    } finally {
      setIsSearchingClienti(false);
      setShowClientiTrovati(true);
    }
  }, 500)

  // lista clienti corrispondenti a ricerca
  const [clientiTrovati, setClientiTrovati] = useState<ClienteInputGroup[]>([]);
  const [showClientiTrovati, setShowClientiTrovati] = useState<boolean>(false);

  // cliente che compare nel form per aggiornare cliente
  const [showFormAggiornaCliente, setShowFormAggiornaCliente] = useState<boolean>(false);
  const [clienteDaAggiornare, setClienteDaAggiornare] = useState<ClienteInputGroup>({});

  const onVCClienteDaAggiornare = (e: any, name: string) => {
    //console.log('change in a value of a clienteDaAggiornare <event, id, name>: ', e, name);
    setClienteDaAggiornare((prevState) => {
      if (name == 'data_di_nascita') {
        const newDate = new Date(e.target.value);
        return { ...prevState, data_di_nascita: newDate };
      } else {
        return { ...prevState, [name]: e.target.value };
      }
    });
  }
  // gestione lista preventivi di un cliente
  const [preventiviClienteList, setPreventiviClienteList] = useState<PreventivoInputGroup[]>([]);
  const [showPreventiviClienteList, setShowPreventiviClienteList] = useState<boolean>(false);

  // gestione show form per creare preventivo
  const [showFormPreventivo, setShowFormPreventivo] = useState<boolean>(false);


  // gestione preventivo
  const [preventivo, setPreventivo] = useState<PreventivoInputGroup>();
  const onVCpreventivo = (e: any, name: string) => {
    //console.log('change in a value of a preventivo <event, id, name>: ', e, name);
    setPreventivo((prevState) => {
      if (name === 'data_partenza') {
        return { ...prevState, data_partenza: new Date(e.target.value) };
      } else if (name === 'data') {
        return { ...prevState, data: new Date(e.target.value) };
      } else {
        let p = { ...prevState, [name]: e.target.value }
        switch (name) {
          case 'adulti': p[name] = parseInt(e.target.value);
            break;
          case 'bambini': p[name] = parseInt(e.target.value);
            break;
          case 'percentuale_ricarico': p[name] = parseFloat(e.target.value);
            break;
        }
        return { ...p };
      }
    });
  }

  // gestione aggiunta/rimozione servizi a terra
  const [serviziATerra, setServiziATerra] = useState<ServizioATerraInputGroup[]>([]);
  const aggiungiServizioATerra = () => {
    const maxId = Math.max(...serviziATerra.map(s => Math.max(s.groupId, 0)))
    let baseId = maxId;
    if (!(maxId > 0)) baseId = 0;
    const newId = baseId + 5;
    setServiziATerra([...serviziATerra, new ServizioATerraInputGroup(newId)]);
  }
  const rimuoviServizioATerra = (groupId: number) => {
    setServiziATerra(serviziATerra.filter(servizio => servizio.groupId !== groupId));
  }

  const aggiungiPagamento = (servizioATerraId) => {
    const s = serviziATerra.find(s => s.id == servizioATerraId);
    const newId = Math.max(...s?.pagamenti.map(p => p.id)) + 5
    const p = new Pagamento(newId)
    s.pagamenti.push(p)
  }

  const onVCServizioATerra = (e: any, id: number, name: string) => {
    console.log('change in a value of a servizioATerra <event, id, name>: ', e, id, name);
    setServiziATerra(serviziATerra.map(servizio => {
      if (servizio.groupId === id) {
        if (name === 'data') {
          servizio.data = new Date(e.target.value);
        } else {
          servizio[name] = e.target.value;
          switch (name) {
            case 'numero_notti': servizio[name] = parseInt(e.target.value);
              break;
            case 'numero_camere': servizio[name] = parseInt(e.target.value);
              break;
            case 'totale': servizio[name] = parseFloat(e.target.value);
              break
            case 'cambio': servizio[name] = parseFloat(e.target.value);
              break
          }
        }
      }
      return { ...servizio };
    }));
  }

  // gestione aggiunta/rimozione servizi aggiuntivi
  const [serviziAggiuntivi, setServiziAggiuntivi] = useState<ServizioATerraInputGroup[]>([]);
  const aggiungiServizioAggiuntivo = () => {
    const maxId = Math.max(...serviziAggiuntivi.map(s => Math.max(s.groupId, 0)))
    let baseId = maxId;
    if (!(maxId > 0)) baseId = 0;
    const newId = baseId + 5;
    setServiziAggiuntivi([...serviziAggiuntivi, new ServizioATerraInputGroup(newId, undefined, undefined, undefined, undefined, 0, 0, undefined, 0, 0, true)]);
  }
  const rimuoviServizioAggiuntivo = (groupId: number) => {
    setServiziAggiuntivi(serviziAggiuntivi.filter(servizio => servizio.groupId !== groupId));
  }
  const onVCServizioAggiuntivo = (e: any, id: number, name: string) => {
    //console.log('change in a value of a servizioAggiuntivo <event, id, name>: ', e, id, name);
    setServiziAggiuntivi(serviziAggiuntivi.map(servizio => {
      if (servizio.groupId === id) {
        if (name === 'data') {
          servizio.data = new Date(e.target.value);
        } else {
          servizio[name] = e.target.value;
          switch (name) {
            case 'numero_notti': servizio[name] = parseInt(e.target.value);
              break;
            case 'numero_camere': servizio[name] = parseInt(e.target.value);
              break;
            case 'totale': servizio[name] = parseFloat(e.target.value);
              break
            case 'cambio': servizio[name] = parseFloat(e.target.value);
              break
          }
        }
      }
      return { ...servizio };
    }));
  }

  // gestione aggiunta/rimozione voli
  const [voli, setVoli] = useState<VoloInputGroup[]>([]);
  const aggiungiVolo = () => {
    const maxId = Math.max(...voli.map(s => Math.max(s.groupId, 0)))
    let baseId = maxId;
    if (!(maxId > 0)) baseId = 0;
    const newId = baseId + 5;
    setVoli([...voli, new VoloInputGroup(newId)]);

  }
  const rimuoviVolo = (groupId: number) => {
    setVoli(voli.filter(servizio => servizio.groupId !== groupId));
  }
  const onVCVolo = (e: any, id: number, name: string) => {
    //console.log('change in a value of a volo <event, id, name>: ', e, id, name);
    setVoli(voli.map(volo => {
      if (volo.groupId === id) {
        if (name === 'data_partenza') {
          volo.data_partenza = new Date(e.target.value);
        } else if (name === 'data_arrivo') {
          volo.data_arrivo = new Date(e.target.value);
        } else {
          volo[name] = e.target.value;
          switch (name) {
            case 'totale': volo[name] = parseFloat(e.target.value);
              break;
            case 'ricarico': volo[name] = parseFloat(e.target.value);
              break;
            case 'cambio': volo[name] = parseFloat(e.target.value);
              break;
            case 'numero': volo[name] = parseInt(e.target.value);
          }
        }
      }
      return { ...volo };
    }));
  }

  // gestione aggiunta/rimozione assicurazioni
  const [assicurazioni, setAssicurazioni] = useState<AssicurazioneInputGroup[]>([]);
  const aggiungiAssicurazione = () => {
    const maxId = Math.max(...assicurazioni.map(s => Math.max(s.groupId, 0)))
    let baseId = maxId;
    if (!(maxId > 0)) baseId = 0;
    const newId = baseId + 5;
    setAssicurazioni([...assicurazioni, new AssicurazioneInputGroup(newId)]);
  }
  const rimuoviAssicurazione = (groupId: number) => {
    setAssicurazioni(assicurazioni.filter(assicurazione => assicurazione.groupId !== groupId));
  }
  const onVCAssicurazione = (e: any, id: number, name: string) => {
    //console.log('change in a value of a assicurazione <event, id, name>: ', e, id, name);
    setAssicurazioni(assicurazioni.map(assicurazione => {
      if (assicurazione.groupId === id) {
        switch (name) {
          case 'netto':
          case 'ricarico': assicurazione[name] = parseFloat(e.target.value);
            break;
          case 'numero': assicurazione[name] = parseInt(e.target.value);
            break;
          default: assicurazione[name] = e.target.value;
        }
      } return { ...assicurazione };
    }));
  }

  // gestione preventivo mostrare cliente
  const [preventivoAlCliente, setPreventivoAlCliente] = useState<PreventivoAlClienteInputGroup>(
    new PreventivoAlClienteInputGroup(undefined, [], [])
  );
  const aggiungiPreventivoAlClienteRow = (tipo: 'righePrimoTipo' | 'righeSecondoTipo') => {
    const maxId = Math.max(...preventivoAlCliente[tipo].map(s => Math.max(s.groupId, 0)))
    let baseId = maxId;
    if (!(maxId > 0)) baseId = 0;
    const newId = baseId + 5;
    setPreventivoAlCliente((prevState) => {
      return { ...prevState, [tipo]: [...prevState[tipo], new PreventivoAlClienteRow(newId)] };
    });
  }
  const rimuoviPreventivoAlClienteRow = (tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number) => {
    setPreventivoAlCliente((prevState) => {
      return { ...prevState, [tipo]: prevState[tipo].filter(row => row.groupId !== groupId) };
    });
  }
  const onVCpreventivoAlClienteDescrizioneViaggio = (e: any) => {
    setPreventivoAlCliente((prevState) => {
      return { ...prevState, descrizione_viaggio: e.target.value };
    });
  }
  const onVCPreventivoAlClienteRow = (e: any, tipo: 'righePrimoTipo' | 'righeSecondoTipo', id: number, name: string) => {
    //console.log('change in a value of a preventivoMostrareCliente <event, id, name>: ', e, id, name);
    setPreventivoAlCliente((prevState) => {
      return {
        ...prevState, [tipo]: prevState[tipo].map(row => {
          if (row.groupId === id) {
            switch (name) {
              case 'individuale': row[name] = parseFloat(e.target.value);
                break;
              case 'numero': row[name] = parseInt(e.target.value);
                break;
              default: row[name] = e.target.value;
            }
          }
          return { ...row };
        })
      }
    });
  }

  // feedbacks del form
  const [feedback, setFeedback] = useState<{ success: true } | null>(null);
  // errors list
  const [errorsList, setErrorsList] = useState<string[]>([]);

  // ### API CALLS ###
  /** Fetch the clienti corrispondenti to the cliente input. */
  const fetchClientiCorrispondenti = async () => {
    // Esegui la chiamata all'API solo se 
    // showFormPreventivo è false
    const response = await fetch('/api/clienti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    if (response.ok) {
      const data: ClienteInputGroup[] = await response.json();
      console.log('data: ', data);
      return data;
    } else {
      setErrorsList(['Errore nella chiamata: ', response.statusText]);
    }
  }
  const fetchDataPreventivoDaAggiornare = async (p: PreventivoInputGroup): Promise<Data> => {
    console.log("p: ", p);
    const response = await fetch('/api/preventivi/data-preventivo-completi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    });
    if (response.ok) {
      const data: DBResult<Data> = await response.json();
      console.log('data completi preventivo: ', data);
      if (data.success) {
        return data.values;
      } else {
        setErrorsList(['Errore nella chiamata: ', (data.errorsMessage || '') + '\n', validationErrorsToString(data.errors)]);
      }
    } else {
      setErrorsList(['Errore nella chiamata: ', response.statusText]);
    }
  }

  // ### GESTIONE EVENTI CLICK ###

  const onClickShowFormAggiornaCliente = (c: ClienteInputGroup) => {
    setClienteDaAggiornare(c);
    setShowFormAggiornaCliente(!showFormAggiornaCliente);
  }

  /**
   * Check if the email is valid and try to create cliente
   * if creation is successful, fetch clienti based on clienti form and show them.
   */
  const submitCreateCliente = async () => {
    if (cliente.email && isValidEmail(cliente.email)) { // email esiste ed è valida -> procedi a creazione cliente
      if (cliente.tel && !isValidTel(cliente.tel)) {
        setErrorsList(['Inserisci un numero di telefono con formato valido.']);
        return;
      }
      setIsActiveSpinner(true);
      try {
        const res = await createCliente(cliente);
        if (res.success) { // cliente creato con successo
          const clienti = await fetchClientiCorrispondenti();
          setClientiTrovati(clienti);
          setIsActiveSpinner(false);
          showOperationSuccessfull();
        } else { // TODO: mostrare errori in modo più esplicito -> mostrare errori validazione, mostrare tipo di errore (db o altro)
          setErrorsList(['Errore nella creazione del cliente: ', (res.error || '') + '\n', validationErrorsToString(res.errors)]);
        }
      } catch (error) {
        setErrorsList(['Errore nella chiamata: ' + error.toString()]);
      }
      finally {
        setIsActiveSpinner(false);
      }
    }
    else { // email non esiste o non è valida o  -> mostrare errore
      setErrorsList(['Inserisci una email con formato valido.']);
    }
  }

  /**
   * Check if the email is valid and update cliente
   * if update is successful, fetch clienti based on clienti form and show them.
   * @param c - cliente to update
   */
  const submitUpdateCliente = async (c: ClienteInputGroup) => {
    if (c.email && isValidEmail(c.email)) {
      if (c.tel && !isValidTel(c.tel)) {
        setErrorsList(['Inserisci un numero di telefono con formato valido.']);
        return;
      }
      setIsActiveSpinner(true);
      try {
        const res = await updateCliente({ ...c, id: c.id });
        if (res.success) {
          setCliente(c);
          setShowClientiTrovati(false);
          showOperationSuccessfull();
        } else {
          setErrorsList(['Errore nell\'aggiornamento del cliente: ', (res.error || '') + '\n', validationErrorsToString(res.errors)]);
        }
      } catch (error) {
        setErrorsList(['Errore nella chiamata: ' + error.toString()]);
      }
      finally {
        setIsActiveSpinner(false);
      }
    } else { // email non esiste o non è valida -> mostrare errore
      setErrorsList(['Inserisci un email con formato valido.']);
    }
  }

  const onClickMostraListaPreventivi = async (c: ClienteInputGroup) => {
    setIsActiveSpinner(true);
    console.log('the cliente state is: ', c);
    const response = await fetch('/api/preventivi/preventivi-by-cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(c.id),
    });
    const preventiviByClienteDBResult: DBResult<Preventivo[]> = await response.json();
    console.log('data: ', preventiviByClienteDBResult);
    if (preventiviByClienteDBResult.success) { // se la chiamata all'API è andata a buon fine
      // se ci sono preventivi, mostrare la lista, altrimenti mostrare errore
      if (preventiviByClienteDBResult.values.length > 0) {
        const preventiviInputGroup = preventiviByClienteDBResult.values.map(p => new PreventivoInputGroup(p));
        setClienteDaAggiornare(c);
        setPreventiviClienteList(preventiviInputGroup);
        setShowPreventiviClienteList(!showPreventiviClienteList);
      } else {
        setErrorsList(['Il cliente non ha preventivi...']);
      }
    } else {
      setErrorsList(['Errore nella ricerca dei preventivi del cliente: ', (preventiviByClienteDBResult.errorsMessage || '') + '\n', validationErrorsToString(preventiviByClienteDBResult.errors)]);
    }
    setIsActiveSpinner(false);
  }

  /**
   * Pulisci tutti i campi del form preventivo e mostra il form per creare un nuovo preventivo
   * @param c - cliente
   */
  const onClickNuovoPreventivo = async (c: ClienteInputGroup) => {
    setCliente((prevState) => { return { ...prevState, ...c } });
    setIsActiveSpinner(true);
    const response = await fetch('/api/preventivi/number-of-preventivi', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const numeroPreventiviDBResult: DBResult<number> = await response.json();
      if (numeroPreventiviDBResult.success) {
        const numeroPreventivo = numberToExcelFormat((numeroPreventiviDBResult.values || 0) + 1);
        setPreventivo(() => new PreventivoInputGroup(numeroPreventivo));
        setServiziATerra(() => []);
        setServiziAggiuntivi(() => []);
        setVoli(() => []);
        setAssicurazioni(() => []);
        setPreventivoAlCliente(() => new PreventivoAlClienteInputGroup(undefined, [], []));
        setShowFormPreventivo(true);
      } else {
        setErrorsList([
          'Errore nella chiamata per ottenere numero di preventivi: ' +
          (numeroPreventiviDBResult.errorsMessage || '') + '\n'
        ]);
      }
    } else {
      setErrorsList(['Errore nella chiamata per ottenere numero di preventivi, controlla la connessione e riprova: ', response.statusText]);
    }
    setIsActiveSpinner(false);
  }

  /** Call api to create a preventivo and set the feedback */
  const submitCreatePreventivo = async () => {
    setErrorsList([]);

    if (preventivo.id) {

    }
    else {
      const data: Data = {
        cliente: cliente,
        preventivo: preventivo,
        serviziATerra: serviziATerra,
        serviziAggiuntivi: serviziAggiuntivi,
        voli: voli,
        assicurazioni: assicurazioni,
        preventivoAlCliente: preventivoAlCliente
      }
      const errors = dataErrors(data);
      if (errors.length == 0) { // all required fields are filled -> CALL API
        setIsActiveSpinner(true);
        try {
          const response = await fetch('/api/preventivi/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          await response.json();
          showOperationSuccessfull();
          setShowFormPreventivo(false);
        } catch (error) {
          setErrorsList(['Errore nella chiamata: ' + error.toString()]);
        }
        finally {
          setIsActiveSpinner(false);
        }
      } else {
        setErrorsList(errors);
      }
    }
  }

  const onClickShowFormAggiornaPreventivo = async (c: ClienteInputGroup, p: PreventivoInputGroup) => {
    setIsActiveSpinner(true);
    const data = await fetchDataPreventivoDaAggiornare(p);
    console.log("data lpkojihugyftdr: ", data);
    data.preventivo.numero_preventivo = numberToExcelFormat(parseInt(data.preventivo.numero_preventivo));
    if (data) {
      setCliente(c);
      setPreventivo(data.preventivo);
      setServiziATerra(data.serviziATerra);
      setServiziAggiuntivi(data.serviziAggiuntivi);
      setVoli(data.voli);
      setAssicurazioni(data.assicurazioni);
      setPreventivoAlCliente(data.preventivoAlCliente);
      setShowFormPreventivo(true);
    }
    setIsActiveSpinner(false);
  }

  const submitUpdatePreventivo = async () => {
    setErrorsList([]);
    const data: Data = {
      cliente: cliente,
      preventivo: preventivo,
      serviziATerra: serviziATerra,
      serviziAggiuntivi: serviziAggiuntivi,
      voli: voli,
      assicurazioni: assicurazioni,
      preventivoAlCliente: preventivoAlCliente
    }
    const errors = dataErrors(data);
    if (errors.length == 0) { // all required fields are filled -> CALL API
      setIsActiveSpinner(true);
      try {
        await fetch('/api/preventivi/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        showOperationSuccessfull();
        setShowFormPreventivo(false);
      } catch (error) {
        setErrorsList(['Errore nella chiamata: ' + error.toString()]);
      }
      finally {
        setIsActiveSpinner(false);
      }
    } else {
      setErrorsList(errors);
    }
  }

  const showOperationSuccessfull = () => {
    setTimeout(() => {
      setFeedback({ success: true });
    }, 200);
    setTimeout(() => {
      setErrorsList([]);
      setFeedback(null);
    }, 2200);
  }

  /** Pulizia di tutti i campi */
  const clearAll = () => {
    setCliente(undefined);
    setClienteDaAggiornare(undefined);
    setPreventivo(new PreventivoInputGroup(undefined));
    setServiziATerra([]);
    setServiziAggiuntivi([]);
    setVoli([]);
    setAssicurazioni([]);
    setPreventivoAlCliente(new PreventivoAlClienteInputGroup(undefined, [], []));
    setShowFormPreventivo(false);
    setShowFormAggiornaCliente(false);
    setShowPreventiviClienteList(false);
    setShowClientiTrovati(false);
    setErrorsList([]);
  }
  // gestione lista preventivi di un cliente
  useEffect(() => {
    console.log('the cliente state is: ', cliente);
    setShowFormAggiornaCliente(false);
    setShowPreventiviClienteList(false);
    setShowClientiTrovati(false);
    setErrorsList([]);
  }, [cliente]);
  useEffect(() => {
    console.log('the clienteDaAggiornare state is: ', clienteDaAggiornare);
    setErrorsList([]);
  }, [clienteDaAggiornare]);
  useEffect(() => {
    console.log('the preventivo state is: ', preventivo);
    setErrorsList([]);
  }, [preventivo]);
  useEffect(() => {
    console.log('the serviziATerra state is: ', serviziATerra);
    setErrorsList([]);
  }, [serviziATerra]);
  useEffect(() => {
    console.log('the serviziAggiuntivi state is: ', serviziAggiuntivi);
    setErrorsList([]);
  }, [serviziAggiuntivi]);
  useEffect(() => {
    console.log('the voli state is: ', voli);
    setErrorsList([]);
  }, [voli]);
  useEffect(() => {
    console.log('the assicurazioni state is: ', assicurazioni);
    setErrorsList([]);
  }, [assicurazioni]);
  useEffect(() => {
    if (showFormPreventivo) { setShowPreventiviClienteList(false); setShowClientiTrovati(false); }
    setErrorsList([]);
  }, [showFormPreventivo]);
  useEffect(() => {
    if (showClientiTrovati) setShowFormPreventivo(false);
    setErrorsList([]);
  }, [showClientiTrovati]);
  useEffect(() => {
    if (showFormAggiornaCliente) {
      setShowFormPreventivo(false);
      setShowPreventiviClienteList(false);
    }

    setErrorsList([]);
  }, [showFormAggiornaCliente]);
  useEffect(() => {
    if (showPreventiviClienteList) {
      setShowFormPreventivo(false);
      setShowFormAggiornaCliente(false);
    }
    setErrorsList([]);
  }, [showPreventiviClienteList]);
  useEffect(() => {
    console.log('the preventivoAlCliente state is: ', preventivoAlCliente);
    setErrorsList([]);
  }, [preventivoAlCliente]);

  return (
    <div className='flex flex-col space-y-6'>
      {feedback && <Feedback<any> result={feedback} />}
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DocumentTextIcon className="w-8 h-8 text-green-600" />
            General Interface Preventivo
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema completo per la gestione di clienti e preventivi di viaggio
          </p>
        </div>
        <Badge variant="secondary" className="hidden md:flex">
          Sistema Integrato
        </Badge>
      </div>

      <div className="general-interface-container max-w-7xl">

        {/* Cliente Section */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserIcon className="w-6 h-6 text-blue-600" />
                Gestione Cliente
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={async () => submitCreateCliente()} >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Crea Cliente
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clearAll()} >
                  Pulisci Tutto
                </Button>
              </div>
            </div>
            <CardDescription>
              Inserisci i dati del cliente per cercare clienti esistenti o crearne di nuovi
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">

          <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
              <InputText label="Cognome" name="cognome" onChange={(e) => onVCCliente(e, 'cognome')} value={cliente?.cognome} className="w-[200px]" />
              <InputText label="Nome" name="nome" onChange={(e) => onVCCliente(e, 'nome')} value={cliente?.nome} className="w-[200px]" />
              <InputEmail label="Email" name="email" onChange={(e) => onVCCliente(e, 'email')} value={cliente?.email} />
              <InputTell label="Telefono" name="tel" onChange={(e) => onVCCliente(e, 'tel')} value={cliente?.tel} />
              <InputSelect label="Sesso" name="sesso" options={['M', 'F']} onChange={(e) => onVCCliente(e, 'sesso')} value={cliente?.sesso} className="w-[60px]" />
            </div>

            <div className="flex flex-row space-x-2 mt-3">
              <InputText label="Indirizzo" name="indirizzo" onChange={(e) => onVCCliente(e, 'indirizzo')} value={cliente?.indirizzo} className="w-[310px]" />
              <InputText label="CAP" name="cap" onChange={(e) => onVCCliente(e, 'cap')} value={cliente?.cap} className="w-[90px]" />
              <InputText label="Città" name="citta" onChange={(e) => onVCCliente(e, 'citta')} value={cliente?.citta} className="w-[200px]" />
              <InputText label="Prov R" name="provincia" onChange={(e) => onVCCliente(e, 'provincia')} value={cliente?.provincia} className="w-[60px]" />
              <InputText label="Codice Fiscale" name="codice fiscale" onChange={(e) => onVCCliente(e, 'cf')} value={cliente?.cf} className="w-[170px]" />
            </div>

            <div className="flex flex-row space-x-2 mt-3">
              <InputDate label="Data di Nascita" name="data_di_nascita" onChange={(e) => onVCCliente(e, 'data_di_nascita')} value={cliente?.data_di_nascita ? moment(cliente?.data_di_nascita).format('YYYY-MM-DD') : ''} />
              <InputText label="Luogo di Nascita" name="luogo_nascita" onChange={(e) => onVCCliente(e, 'luogo_nascita')} value={cliente?.luogo_nascita} className="w-[200px]" />
              <InputText label="Prov N" name="provincia_nascita" onChange={(e) => onVCCliente(e, 'provincia_nascita')} value={cliente?.provincia_nascita} className="w-[60px]" />
              <InputText label="Numero Passaporto" name="numero_passaporto" onChange={(e) => onVCCliente(e, 'numero_passaporto')} value={cliente?.numero_passaporto} className="w-[140px]" />
              <InputDate label="Scadenza Passaporto" name="data_scadenza_passaporto" onChange={(e) => onVCCliente(e, 'data_scadenza_passaporto')} value={cliente?.data_scadenza_passaporto ? moment(cliente?.data_scadenza_passaporto).format('YYYY-MM-DD') : ''} />
              <InputText label="Nazionalità" name="nazionalita" onChange={(e) => onVCCliente(e, 'nazionalita')} value={cliente?.nazionalita} className="w-[146px]" />
            </div>

            <div className="flex flex-row space-x-2 mt-3">
              <InputSelect label="Tipo" name="tipo" options={['PRIVATO', 'AGENZIA VIAGGI', 'AZIENDA']} onChange={(e) => onVCCliente(e, 'tipo')} value={cliente?.tipo} className="w-[160px]" />
              <InputSelect label="Provenienza" name="provenienza" options={provenienzaOptions} onChange={(e) => onVCCliente(e, 'provenienza')} value={cliente?.provenienza} className="w-[130px]" />
              <InputText label="Collegato" name="collegato" onChange={(e) => onVCCliente(e, 'collegato')} value={cliente?.collegato} className="w-[190px]" />
              <InputText textarea label="Note Cliente" name="note cliente" onChange={(e) => onVCCliente(e, 'note')} value={cliente?.note} className="w-[354px]" />
            </div>
          </div>

          {/* -----------------------------------------------------------
         LISTA CLIENTI TROVATI
        ----------------------------------------------------------- */}

          {isSearchingClienti && !showClientiTrovati &&
            <div className="flex flex-col">
              <p>Ricerca clienti...</p>
            </div>
          }

          {showClientiTrovati &&
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Clienti Trovati</CardTitle>
                <CardDescription>Seleziona un cliente dalla lista per gestire i suoi preventivi</CardDescription>
              </CardHeader>
              <CardContent>
                {clientiTrovati?.length > 0 && clientiTrovati.map((c, i) => (
                  <Card key={c.id} className="mb-4 border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <p className="font-semibold text-gray-900">{c.cognome} {c.nome}</p>
                          <p className="text-sm text-gray-600">{c.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { onClickMostraListaPreventivi(c); }} >
                            <DocumentTextIcon className="w-4 h-4 mr-1" />
                            {showPreventiviClienteList && c.id == clienteDaAggiornare.id ? 'Nascondi Lista' : 'Lista Prev'}
                          </Button>

                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => onClickNuovoPreventivo(c)} >
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Nuovo Prev
                          </Button>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onClickShowFormAggiornaCliente(c)} >
                            <UserIcon className="w-4 h-4 mr-1" />
                            {showFormAggiornaCliente && clienteDaAggiornare.id == c.id ? 'Annulla' : 'Aggiorna'}
                          </Button>
                        </div>
                      </div>

                  {/* -----------------------------------------------------------
         AGGIORNA CLIENTE
        ----------------------------------------------------------- */}

                  {showFormAggiornaCliente && clienteDaAggiornare.id == c.id &&
                    <div>
                      <div className="flex flex-row space-x-2 mt-3">
                        <InputText label="Cognome" name="cognome" onChange={(e) => onVCClienteDaAggiornare(e, 'cognome')} value={clienteDaAggiornare?.cognome} className="w-[200px]" />
                        <InputText label="Nome" name="nome" onChange={(e) => onVCClienteDaAggiornare(e, 'nome')} value={clienteDaAggiornare?.nome} className="w-[200px]" />
                        <InputEmail label="Email" name="email" onChange={(e) => onVCClienteDaAggiornare(e, 'email')} value={clienteDaAggiornare?.email} />
                        <InputTell label="Telefono" name="tel" onChange={(e) => onVCClienteDaAggiornare(e, 'tel')} value={clienteDaAggiornare?.tel} />
                        <InputSelect label="Sesso" name="sesso" options={['M', 'F']} onChange={(e) => onVCClienteDaAggiornare(e, 'sesso')} value={clienteDaAggiornare?.sesso} className="w-[60px]" />
                      </div>

                      <div className="flex flex-row space-x-2 mt-3">
                        <InputText label="Indirizzo" name="indirizzo" onChange={(e) => onVCClienteDaAggiornare(e, 'indirizzo')} value={clienteDaAggiornare?.indirizzo} className="w-[280px]" />
                        <InputText label="CAP" name="cap" onChange={(e) => onVCClienteDaAggiornare(e, 'cap')} value={clienteDaAggiornare?.cap} className="w-[90px]" />
                        <InputText label="Città" name="citta" onChange={(e) => onVCClienteDaAggiornare(e, 'citta')} value={clienteDaAggiornare?.citta} className="w-[200px]" />
                        <InputText label="Prov R" name="provincia" onChange={(e) => onVCClienteDaAggiornare(e, 'provincia')} value={clienteDaAggiornare?.provincia} className="w-[60px]" />
                        <InputText label="CF" name="cf" onChange={(e) => onVCClienteDaAggiornare(e, 'cf')} value={clienteDaAggiornare?.cf} className="w-[200px]" />
                      </div>

                      <div className="flex flex-row space-x-2 mt-3">
                        <InputDate label="Data di nascita" name="data_di_nascita" onChange={(e) => onVCClienteDaAggiornare(e, 'data_di_nascita')} value={clienteDaAggiornare?.data_di_nascita ? moment(clienteDaAggiornare?.data_di_nascita).format('YYYY-MM-DD') : ''} />
                        <InputText label="Luogo di nascita" name="luogo_nascita" onChange={(e) => onVCClienteDaAggiornare(e, 'luogo_nascita')} value={clienteDaAggiornare?.luogo_nascita} className="w-[200px]" />
                        <InputText label="Prov N" name="provincia_nascita" onChange={(e) => onVCClienteDaAggiornare(e, 'provincia_nascita')} value={clienteDaAggiornare?.provincia_nascita} className="w-[60px]" />
                        <InputText label="Numero Passaporto" name="numero_passaporto" onChange={(e) => onVCClienteDaAggiornare(e, 'numero_passaporto')} value={clienteDaAggiornare?.numero_passaporto} className="w-[140px]" />
                        <InputDate label="Scadenza Passaporto" name="data_scadenza_passaporto" onChange={(e) => onVCClienteDaAggiornare(e, 'data_scadenza_passaporto')} value={clienteDaAggiornare?.data_scadenza_passaporto ? moment(clienteDaAggiornare?.data_scadenza_passaporto).format('YYYY-MM-DD') : ''} />
                        <InputText label="Nazionalità" name="nazionalita" onChange={(e) => onVCClienteDaAggiornare(e, 'nazionalita')} value={clienteDaAggiornare?.nazionalita} className="w-[146px]" />
                      </div>

                      <div className="flex flex-row space-x-2 mt-3">
                        <InputSelect label="Tipo" name="tipo" options={['PRIVATO', 'AGENZIA VIAGGI', 'AZIENDA']} onChange={(e) => onVCClienteDaAggiornare(e, 'tipo')} value={clienteDaAggiornare?.tipo} className="w-[160px]" />
                        <InputSelect label="Provenienza" name="provenienza" options={provenienzaOptions} onChange={(e) => onVCClienteDaAggiornare(e, 'provenienza')} value={clienteDaAggiornare?.provenienza} className="w-[130px]" />
                        <InputText label="Collegato" name="collegato" onChange={(e) => onVCClienteDaAggiornare(e, 'collegato')} value={clienteDaAggiornare?.collegato} className="w-[190px]" />
                        <InputText textarea label="Note" name="note" onChange={(e) => onVCClienteDaAggiornare(e, 'note')} value={clienteDaAggiornare?.note} className="w-[354px]" />
                      </div>

                      <Button
                        className="mt-3"
                        onClick={() => submitUpdateCliente(clienteDaAggiornare)} >
                        Aggiorna Cliente
                      </Button>
                    </div>
                  }

                  {/* -----------------------------------------------------------
         LISTA PREVENTIVI DEL CLIENTE
        ----------------------------------------------------------- */}

                  {showPreventiviClienteList && c.id == clienteDaAggiornare.id &&
                    <div key={c.id + 'preventiviClienteList'} className="ml-[400px] flex flex-col pt-0" >
                      {preventiviClienteList.length > 0 && preventiviClienteList.map((p, i) => (
                        <div key={p.id} className="flex flex-row gap-2 pt-2 justify-between text-sm text-brown-500">
                          <div > {i + 1}. {formatDate(p.data_partenza)} - {p.riferimento} - {p.operatore}
                          </div>
                          <Button
                            className="bg-white text-brown-500 hover:text-white"
                            onClick={() => onClickShowFormAggiornaPreventivo(c, p)}>
                            VEDI PREVENTIVO
                          </Button>
                        </div>
                      ))}
                    </div>
                  }
                    </CardContent>
                  </Card>
                ))}
                </CardContent>
              </Card>
            }
          </CardContent>
        </Card>

        {/* Preventivo Section */}
        {showFormPreventivo && 
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-brown-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <DocumentTextIcon className="w-6 h-6 text-green-600" />
              Gestione Preventivo
              <Badge variant="outline" className="ml-2">
                {formatDateToString(preventivo?.data_partenza)} {preventivo?.brand} {preventivo?.numero_preventivo?.toString()}
              </Badge>
            </CardTitle>
            <CardDescription>
              Crea o modifica un preventivo di viaggio con tutti i servizi inclusi
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div>
          {/* preventivo */}
          <div>
            {/* Preventivo Cliente */}
            <div>
              <div className="flex items-center h-24 gap-3 pl-0 pt-8">
                <h3 className="text-xl md:text-2xl pb-1">Preventivo</h3>
                <span className="text-xl text-brown-300 font-semibold">
                  {formatDateToString(preventivo?.data_partenza)} {preventivo?.brand} {preventivo?.numero_preventivo?.toString()}
                </span>
              </div>

              <div className="flex flex-row space-x-1">
                <InputNumber disabled label="ID" name="numero_preventivo" onChange={(e) => onVCpreventivo(e, 'numero_preventivo')} value={preventivo?.numero_preventivo?.toString()} className="w-[52px]" />
                <InputSelect label="Brand" name="brand" options={brandOptions} onChange={(e) => onVCpreventivo(e, 'brand')} value={preventivo?.brand} className="w-[80px]" />
                <InputSelect label="Operatore" name="operatore" options={operatoreOptions} onChange={(e) => onVCpreventivo(e, 'operatore')} value={preventivo?.operatore} className="w-[120px]" />
                <InputDate label="Data di Richiesta" name="data" onChange={(e) => onVCpreventivo(e, 'data')} value={preventivo?.data ? moment(preventivo?.data).format('YYYY-MM-DD') : ''} />
                <InputSelect label='Destinazione' onChange={(e) => onVCpreventivo(e, 'destinazione')} value={preventivo?.destinazione} name="destinazione" options={destinazioniOptions} className="w-[175px]" />
                <InputDate label="Data di Partenza" name="data_partenza" onChange={(e) => onVCpreventivo(e, 'data_partenza')} value={preventivo?.data_partenza ? moment(preventivo?.data_partenza).format('YYYY-MM-DD') : ''} />
                <InputNumber label="Adulti" name="adulti" onChange={(e) => onVCpreventivo(e, 'adulti')} value={preventivo?.adulti?.toString()} className="w-[55px]" />
                <InputNumber label="Bambini" name="bambini" onChange={(e) => onVCpreventivo(e, 'bambini')} value={preventivo?.bambini?.toString()} className="w-[55px]" />
              </div>

              <div className="flex flex-row space-x-1">
                <InputText label="Riferimento" name="riferimento" onChange={(e) => onVCpreventivo(e, 'riferimento')} value={preventivo?.riferimento} className="w-[110px]" />
                <InputSelect label='Tipo Viaggio' onChange={(e) => onVCpreventivo(e, 'tipo_viaggio')} value={preventivo?.tipo_viaggio} name="tipo_viaggio" options={tipoViaggioOptions} className="w-[150px]" />
                <InputText label="Note" name="note" onChange={(e) => onVCpreventivo(e, 'note')} value={preventivo?.note} className="w-[215px]" />
                <InputText label="Feedback" name="feedback" onChange={(e) => onVCpreventivo(e, 'feedback')} value={preventivo?.feedback} className="w-[215px]" />
                <InputSelect label="Stato" name="stato" options={statoOptions} onChange={(e) => onVCpreventivo(e, 'stato')} value={preventivo?.stato} className="w-[140px]" />
              </div>

              <div className="flex flex-row">
                <InputNumber label="Percentuale ricarico" name="percentuale_ricarico" value={preventivo?.percentuale_ricarico?.toString()} onChange={(e) => onVCpreventivo(e, 'percentuale_ricarico')} />
              </div>
            </div>

            {/* -----------------------------------------------------------
         SERVIZI A TERRA
        ----------------------------------------------------------- */}
            <div id="servizi-a-terra" className="input-block">
              <div className="input-group-row">
                <h3 className="text-xl md:text-2xl" > Servizi a Terra</h3 >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={aggiungiServizioATerra} >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Aggiungi Servizio
                </Button>
              </div>

              <div className="input-group-list">
                {
                  serviziATerra.map((servizio, i) => (
                    <div key={servizio.groupId}>

                      <div className="flex flex-row justify-between">
                        <div className="input-group-row">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => rimuoviServizioATerra(servizio.groupId)}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>

                          <InputSelect onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'destinazione')} value={servizio?.destinazione} label={i == 0 ? 'Destinazione' : ''} name="destinazione" options={destinazioniOptions} className="w-[160px]" />
                          <InputLookup onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'fornitore')} defaultValue={servizio?.fornitore} label={i == 0 ? 'Fornitore' : ''} name="fornitore" options={fornitoriOptions} className="w-[160px]" />
                          <InputText onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'descrizione')} value={servizio?.descrizione} label={i == 0 ? 'Descrizione Servizio' : ''} name="descrizione" className="w-[160px]" />
                          <InputDate onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'data')} value={servizio?.data ? moment(servizio?.data).format('YYYY-MM-DD') : ''} label={i == 0 ? 'Data Inizio' : ''} name="data" />
                          <InputNumber onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'numero_notti')} value={servizio?.numero_notti?.toString()} label={i == 0 ? 'N. Notti' : ''} name="numero_notti" className="w-[60px]" />
                          <InputNumber onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'numero_camere')} value={servizio?.numero_camere?.toString()} label={i == 0 ? 'N. Cam.' : ''} name="numero_camere" className="w-[60px]" />
                          <InputNumber onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'totale')} value={servizio?.totale?.toString()} label={i == 0 ? 'I. Unitario' : ''} name="totale" className="w-[80px]" />
                          <InputLookup onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'valuta')} label={i == 0 ? 'Valuta' : ''} name="valuta" defaultValue={servizio?.valuta} options={valuteOptions} className="w-[60px]" />
                          <InputNumber onChange={(e) => onVCServizioATerra(e, servizio.groupId, 'cambio')} value={servizio?.cambio?.toString() ?? '1'} label={i == 0 ? 'Cambio' : ''} name="cambio" className="w-[60px]" />
                        </div>
                        <div className="flex flex-row items-center pt-7 pl-5">
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>ricarico:</p>
                              </div>
                            }
                            <div className="w-32 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getRicaricoServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere))}</p>
                            </div>
                          </div>
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>tot euro:</p>
                              </div>
                            }
                            <div className="w-32 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getTotServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere))}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="tot-euro-of-list flex flex-row items-center justify-end pt-4 pr-11">
                <p>somma tot euro: {formatNumberItalian(serviziATerra.reduce((acc, servizio) => acc + getTotServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere), 0))}</p>
              </div>
            </div>
            {/* Servizi Aggiuntivi */}
            <div id="servizi-aggiuntivi" className="input-block">
              <div className="flex flex-row items-center justify-start">
                <div>
                  <h3 className="text-xl md:text-2xl pt-4 pb-1" > Servizi aggiuntivi</h3 >
                </div>
                <div className="flex flex-row items-center justify-center pt-4 pl-5">
                  <button
                    className=""
                    onClick={aggiungiServizioAggiuntivo}
                  >
                    +
                  </button>
                </div >
              </div>
              <div className="input-group-list">
                {
                  serviziAggiuntivi.map((servizio, i) => (
                    <div key={servizio.groupId}>
                      <div className="flex flex-row justify-between">
                        <div className="input-group-row">
                          <button
                            className="remove-item-button"
                            onClick={() => rimuoviServizioAggiuntivo(servizio.groupId)}
                          >
                            -
                          </button>

                          <InputSelect onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'destinazione')} value={servizio?.destinazione} label={i == 0 ? 'Destinazione' : ''} name="destinazione" options={destinazioniOptions} />
                          <InputLookup onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'fornitore')} defaultValue={servizio?.fornitore} label={i == 0 ? 'Fornitore' : ''} name="fornitore" options={fornitoriOptions} />
                          <InputText onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'descrizione')} value={servizio?.descrizione} label={i == 0 ? 'Descrizione' : ''} name="descrizione" />
                          <InputDate onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'data')} value={servizio?.data ? moment(servizio?.data).format('YYYY-MM-DD') : ''} label={i == 0 ? 'Data' : ''} name="data" />
                          <InputNumber onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'numero_notti')} value={servizio?.numero_notti?.toString()} label={i == 0 ? 'N. Notti' : ''} name="numero_notti" />
                          <InputNumber onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'numero_camere')} value={servizio?.numero_camere?.toString()} label={i == 0 ? 'N. Cam.' : ''} name="numero_camere" />
                          <InputNumber onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'totale')} value={servizio?.totale?.toString()} label={i == 0 ? 'Totale' : ''} name="totale" />
                          <InputLookup onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'valuta')} label={i == 0 ? 'Valuta' : ''} name="valuta" defaultValue={servizio?.valuta} options={valuteOptions} className='max-w-[60px]' />
                          <InputNumber onChange={(e) => onVCServizioAggiuntivo(e, servizio.groupId, 'cambio')} value={servizio?.cambio?.toString() ?? '1'} label={i == 0 ? 'Cambio' : ''} name="cambio" />
                        </div>
                        <div className="flex flex-row items-center pt-7 pl-5">
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>ricarico:</p>
                              </div>
                            }
                            <div className="w-32 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getRicaricoServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere))}</p>
                            </div>
                          </div>
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>tot euro:</p>
                              </div>
                            }
                            <div className="w-32 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getTotServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere))}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="tot-euro-of-list flex flex-row items-end justify-end pt-4 pr-11">
                <p>somma tot euro: {formatNumberItalian(serviziAggiuntivi.reduce((acc, servizio) => acc + getTotServizio(servizio.totale, servizio.cambio, preventivo?.percentuale_ricarico, servizio.numero_notti, servizio.numero_camere), 0))}</p>
              </div>
            </div>
            {/* Voli */}
            <div id="voli">
              <div className="flex flex-row items-center justify-start">
                <div>
                  <h3 className="text-xl md:text-2xl pt-4 pb-1" > Voli</h3 >
                </div>
                <div className="flex flex-row items-center justify-center pt-4 pl-5">
                  <button
                    className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={aggiungiVolo}
                  >
                    +
                  </button>
                </div >
              </div>
              <div className="input-group-list">
                {
                  voli.map((volo, i) => (
                    <div key={volo.groupId}>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                          <InputLookup onChange={(e) => onVCVolo(e, volo.groupId, 'fornitore')} defaultValue={volo?.fornitore} label={i == 0 ? 'Fornitore' : ''} name="fornitore" options={fornitoriOptions} />
                          <InputText onChange={(e) => onVCVolo(e, volo.groupId, 'compagnia_aerea')} value={volo?.compagnia_aerea} label={i == 0 ? 'Compagnia' : ''} name="compagnia" />
                          <InputText onChange={(e) => onVCVolo(e, volo.groupId, 'descrizione')} value={volo?.descrizione} label={i == 0 ? 'Descrizione' : ''} name="descrizione" />
                          <InputDate onChange={(e) => onVCVolo(e, volo.groupId, 'data_partenza')} value={volo?.data_partenza ? moment(volo?.data_partenza).format('YYYY-MM-DD') : ''} label={i == 0 ? 'Partenza' : ''} name="data_partenza" />
                          <InputDate onChange={(e) => onVCVolo(e, volo.groupId, 'data_arrivo')} value={volo?.data_arrivo ? moment(volo?.data_arrivo).format('YYYY-MM-DD') : ''} label={i == 0 ? 'Arrivo' : ''} name="data_arrivo" />
                          <InputNumber onChange={(e) => onVCVolo(e, volo.groupId, 'totale')} value={volo?.totale?.toString()} label={i == 0 ? 'Totale' : ''} name="totale" />
                          <InputNumber onChange={(e) => onVCVolo(e, volo.groupId, 'ricarico')} value={volo?.ricarico?.toString()} label={i == 0 ? 'Ricarico' : ''} name="ricarico" />
                          <InputNumber onChange={(e) => onVCVolo(e, volo.groupId, 'numero')} value={volo?.numero?.toString()} label={i == 0 ? 'Numero' : ''} name="numero" />
                          <InputLookup onChange={(e) => onVCVolo(e, volo.groupId, 'valuta')} label={i == 0 ? 'Valuta' : ''} name="valuta" defaultValue={volo?.valuta} options={valuteOptions} className='max-w-[60px]' />
                          <InputNumber onChange={(e) => onVCVolo(e, volo.groupId, 'cambio')} value={volo?.cambio?.toString() ?? '1'} label={i == 0 ? 'Cambio' : ''} name="cambio" />
                        </div>
                        <div className="flex flex-row items-center pt-7 pl-5">
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>tot euro:</p>
                              </div>
                            }
                            <div className="w-60 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getTotVolo(volo.totale, volo.cambio, volo.ricarico, volo.numero))}</p>
                            </div>
                          </div>
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            <button
                              className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                              onClick={() => rimuoviVolo(volo.groupId)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="tot-euro-of-list flex flex-row items-end justify-end pt-4 pr-11">
                <p>somma tot euro: {formatNumberItalian(voli.reduce((acc, volo) => acc + getTotVolo(volo.totale, volo.cambio, volo.ricarico, volo.numero), 0))}</p>
              </div>
            </div>
            {/* Assicurazioni */}
            <div id="assicurazioni">
              <div className="flex flex-row items-center justify-start">
                <h3 className="text-xl md:text-2xl pt-4 pb-1" > Assicurazioni</h3 >
                <div className="flex flex-row items-center justify-center pt-4 pl-5">
                  <button
                    className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={aggiungiAssicurazione}
                  >
                    +
                  </button>
                </div >
              </div>
              <div className="input-group-list">
                {
                  assicurazioni.map((assicurazione, i) => (
                    <div key={assicurazione.groupId}>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                          <InputLookup onChange={(e) => onVCAssicurazione(e, assicurazione.groupId, 'fornitore')} defaultValue={assicurazione?.fornitore} label={i == 0 ? 'Fornitore' : ''} name="fornitore" options={fornitoriOptions} />
                          <InputText onChange={(e) => onVCAssicurazione(e, assicurazione.groupId, 'assicurazione')} value={assicurazione?.assicurazione} label={i == 0 ? 'Assicurazione' : ''} name="assicurazione" />
                          <InputNumber onChange={(e) => onVCAssicurazione(e, assicurazione.groupId, 'netto')} value={assicurazione?.netto?.toString()} label={i == 0 ? 'Netto' : ''} name="netto" />
                          <InputNumber onChange={(e) => onVCAssicurazione(e, assicurazione.groupId, 'ricarico')} value={assicurazione?.ricarico?.toString()} label={i == 0 ? 'Ricarico' : ''} name="ricarico" />
                          <InputNumber onChange={(e) => onVCAssicurazione(e, assicurazione.groupId, 'numero')} value={assicurazione?.numero?.toString()} label={i == 0 ? 'Numero' : ''} name="numero" />
                        </div>
                        <div className="flex flex-row items-center pt-7 pl-5">
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            {i == 0 &&
                              <div className='flex justify-end mr-3'>
                                <p>tot euro:</p>
                              </div>
                            }
                            <div className="w-60 mr-3 flex justify-end">
                              <p>{formatNumberItalian(getTotAssicurazione(assicurazione.netto, assicurazione.ricarico, assicurazione.numero))}</p>
                            </div>
                          </div>
                          <div className={`${i > 0 ? 'pb-3' : ''}`}>
                            <button
                              className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                              onClick={() => rimuoviAssicurazione(assicurazione.groupId)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="tot-euro-of-list flex flex-row items-center justify-end pt-4 pr-11">
                <span>somma tot euro: </span>
                <span>{formatNumberItalian(assicurazioni.reduce((acc, assicurazione) => acc + getTotAssicurazione(assicurazione.netto, assicurazione.ricarico, assicurazione.numero), 0))}</span>
              </div>

            </div>
            {/* Totale */}
            <div className="tot-euro-of-list flex flex-row items-center justify-end pt-4 pr-11">
              <p className='border-t-2 border-gray-300 pt-2'>somma di tutti i tot euro: {formatNumberItalian(getSommaTuttiTotEuro(preventivo?.percentuale_ricarico, serviziATerra, serviziAggiuntivi, voli, assicurazioni))}</p>
            </div>
          </div>
          {/* preventivo mostrare cliente */}
          <div id="preventivo-mostrare-cliente">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between pb-4">
                  <h3 className="text-xl md:text-2xl pt-4 pb-1" >Preventivo al cliente</h3>
                </div>
                <div className="flex flex-row">
                  <InputText
                    label="Descrizione viaggio"
                    name="descrizione viaggio"
                    textarea
                    onChange={onVCpreventivoAlClienteDescrizioneViaggio}
                    value={preventivoAlCliente?.descrizione_viaggio}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {
                    (['righePrimoTipo', 'righeSecondoTipo'] as ('righePrimoTipo' | 'righeSecondoTipo')[]).map((t, i) => {
                      return <div key={i}>
                        {/* gruppo righe tipo t */}
                        <div className="flex flex-row items-center justify-start">
                          <p className="pt-4">{t == 'righePrimoTipo' ? 'Totale senza assicurazione' : 'Totale con assicurazione'}</p>
                          <div className="flex flex-row items-center justify-center pt-4 pl-5">
                            <button
                              className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                              onClick={() => aggiungiPreventivoAlClienteRow(t as 'righePrimoTipo' | 'righeSecondoTipo')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {preventivoAlCliente?.[t]?.map((row, i) => (
                          <div key={row.groupId} className="flex flex-col">
                            <div key={row.groupId} className="flex flex-row justify-between">
                              <div className="flex flex-row">
                                <InputLookup
                                  label={i == 0 ? "Destinazione" : ''}
                                  name={`destinazione-${row.groupId}`}
                                  options={destinazioniOptions}
                                  onChange={(e) => onVCPreventivoAlClienteRow(e, t, row.groupId, 'destinazione')}
                                  defaultValue={row.destinazione}

                                />
                                <InputText
                                  label={i == 0 ? "Descrizione" : ''}
                                  name={`descrizione-${row.groupId}`}
                                  onChange={(e) => onVCPreventivoAlClienteRow(e, t, row.groupId, 'descrizione')}
                                  value={row.descrizione}
                                />
                                <InputNumber
                                  label={i == 0 ? "Individuale" : ''}
                                  name={`individuale-${row.groupId}`}
                                  onChange={(e) => onVCPreventivoAlClienteRow(e, t, row.groupId, 'individuale')}
                                  value={row.individuale?.toString()}
                                />
                                <InputNumber
                                  label={i == 0 ? "Numero" : ''}
                                  name={`numero-${row.groupId}`}
                                  onChange={(e) => onVCPreventivoAlClienteRow(e, t, row.groupId, 'numero')}
                                  value={row.numero?.toString()}
                                />
                              </div>
                              <div className="flex flex-row items-center pt-7 pl-5">
                                <div className={`${i > 0 ? 'pb-3' : ''}`}>
                                  {i == 0 &&
                                    <div className='flex justify-end mr-3'>
                                      <p>tot euro:</p>
                                    </div>
                                  }
                                  <div className="w-60 mr-3 flex justify-end">
                                    <p>{formatNumberItalian(row.individuale * row.numero)}</p>
                                  </div>
                                </div>
                                <div className={`${i > 0 ? 'pb-3' : ''}`}>
                                  <button
                                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                                    onClick={() => rimuoviPreventivoAlClienteRow(t, row.groupId)}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                        }
                        <div className="flex flex-row items-center justify-end">
                          <p>tot euro {t == 'righePrimoTipo' ? 'senza assicurazione' : 'con assicurazione'}:</p>
                          <div className="w-60 mr-3 flex justify-end">
                            <p>{formatNumberItalian(
                              (preventivoAlCliente?.[t]?.reduce((acc, row) => acc + (row.individuale * row.numero), 0) || 0)
                            )}</p>
                          </div>
                        </div>
                      </div>
                    }
                    )
                  }
                </div>
                <div className="flex flex-row items-center justify-end">
                  <p>totale generale:</p>
                  <div className="w-60 mr-3 flex justify-end">
                    <p>{formatNumberItalian(
                      (preventivoAlCliente?.['righePrimoTipo']?.reduce((acc, row) => acc + (row.individuale * row.numero), 0) || 0) +
                      (preventivoAlCliente?.['righeSecondoTipo']?.reduce((acc, row) => acc + (row.individuale * row.numero), 0) || 0)
                    )}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center pt-10 gap-4">
            <Button
              size="lg"
              onClick={submitCreatePreventivo}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Crea Preventivo
            </Button>
            {preventivo?.id &&
              <Button
                variant="secondary"
                size="lg"
                onClick={submitUpdatePreventivo}
              >
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Aggiorna Preventivo
              </Button>
            }
          </div>
            </div>
          </CardContent>
        </Card>
        }
        {/* Errors Section */}
        {errorsList.length > 0 &&
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 text-lg">Errori Rilevati</CardTitle>
              <CardDescription>Correggi i seguenti errori per continuare</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {errorsList.map((error, index) => (
                  <li key={index} className="text-red-600 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{errorTranslations(error)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        }
      </div>
    </div>
  );
}
