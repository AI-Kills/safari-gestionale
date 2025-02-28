// --------------- FORMATTAZIONE DEL COSTO UNITARIO IN ITALIANO ---------------
function formatUnitCostToItalian(input) {
    const assicurazioneSelect = document.getElementById("assicurazione");
  
    // Se il campo è quello dell'assicurazione e l'assicurazione è rifiutata, lascia il campo vuoto
    if (input.id === "assicurazione-unit-cost" && assicurazioneSelect.value === "rifiutata") {
      input.value = "";
      return;
    }
  
    // Se il campo è vuoto, non eseguire alcuna formattazione
    if (input.value.trim() === "") {
      return;
    }
  
    // Rimuove i punti (migliaia) e converte la virgola in punto per poter fare il parse
    const rawValue = input.value.replace(/\./g, '').replace(',', '.');
    const number = parseFloat(rawValue);
  
    // Se il numero è valido e maggiore di 0, formatta il valore in italiano
    if (!isNaN(number) && number > 0) {
      input.value = number.toLocaleString("it-IT", { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    } else {
      // Se il valore non è valido o non è maggiore di 0, lascia il campo vuoto
      input.value = "";
    }
  
    calculateTotal(); // Ricalcola i totali dopo la modifica
  }
  
  // --------------- GESTIONE DELL'ASSICURAZIONE ---------------
  function toggleAssicurazione() {
    // Elementi comuni
    const assicurazioneSelect = document.getElementById("assicurazione");
    const quantityInput = document.getElementById("assicurazione-quantity");
    const unitCostInput = document.getElementById("assicurazione-unit-cost");
    const descrizioneAcquistare = document.getElementById("descrizione-acquistare");
    const descrizioneRinunciare = document.getElementById("descrizione-rinunciare");
  
    // Rimuove la classe red-text per cambiare il colore dopo la selezione
    assicurazioneSelect.classList.remove("red-text");
  
    // Gestione in base al valore selezionato
    if (assicurazioneSelect.value === "accettata") {
      // Impostazioni per "Assicurazione Annullamento Sottoscritta"
      quantityInput.value = "1";
      quantityInput.readOnly = false;
      quantityInput.classList.remove("readonly");
  
      unitCostInput.readOnly = false;
      unitCostInput.classList.remove("readonly");
      unitCostInput.onfocus = null; // Rimuove eventuali funzioni che forzano il blur
      unitCostInput.placeholder = "0,00";
      unitCostInput.value = ""; // Campo vuoto per forzare l'inserimento manuale
  
      // Mostra la descrizione relativa all'acquisto e nasconde l'altra
      descrizioneAcquistare.style.display = "block";
      descrizioneRinunciare.style.display = "none";
    } else if (assicurazioneSelect.value === "rifiutata") {
      // Impostazioni per "Assicurazione Annullamento Rifiutata"
      quantityInput.value = "";
      quantityInput.readOnly = true;
      quantityInput.classList.add("readonly");
  
      unitCostInput.value = "";
      unitCostInput.readOnly = true;
      unitCostInput.classList.add("readonly");
      unitCostInput.placeholder = "";
      unitCostInput.onfocus = function () { this.blur(); }; // Impedisce di selezionare il campo
  
      // Mostra la descrizione relativa alla rinuncia e nasconde l'altra
      descrizioneAcquistare.style.display = "none";
      descrizioneRinunciare.style.display = "block";
    } else {
      // Se non è selezionato nulla, nasconde entrambe le descrizioni
      descrizioneAcquistare.style.display = "none";
      descrizioneRinunciare.style.display = "none";
    }
  
    // Esegue il calcolo del totale
    calculateTotal();
  }




  // --------------- VALIDAZIONE DEL COSTO ASSICURAZIONE ---------------
  function validateAssicurazioneCost(input) {
    const assicurazioneSelect = document.getElementById("assicurazione");
  
    if (assicurazioneSelect.value === "accettata") {
      // Se il campo è vuoto, non eseguire la validazione
      if (input.value.trim() === "") {
        return;
      }
  
      // Rimuove i punti e converte la virgola in punto
      const value = input.value.replace(/\./g, '').replace(',', '.');
      const number = parseFloat(value);
  
      if (isNaN(number) || number <= 0) {
        alert("L'importo per l'assicurazione deve essere maggiore di 0.");
        input.value = "";
        input.focus();
      } else {
        // Format correttamente in italiano
        input.value = number.toLocaleString("it-IT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    } else if (assicurazioneSelect.value === "rifiutata") {
      input.value = "";
      input.readOnly = true;
      input.placeholder = "";
    }
  
    calculateTotal();
  }
  
  // --------------- FORMATTAZIONE DECIMALI (generica) ---------------
  function formatDecimal(input) {
    let value = parseFloat(input.value.replace(',', '.'));
  
    if (!isNaN(value)) {
      input.value = value.toFixed(2);
    } else {
      input.value = "0.00";
    }
  
    calculateTotal();
  }
  
  // --------------- CALCOLO DEI TOTALI DELLE RIGHE ---------------
  function calculateTotal() {
    let overallTotal = 0;
    const rows = document.querySelectorAll('.quota-row');
  
    rows.forEach(row => {
      const quantityInput = row.querySelector('.quantity');
      const unitCostInput = row.querySelector('.unit-cost');
      const totalElement = row.querySelector('.total');
  
      if (quantityInput && unitCostInput && totalElement) {
        // Se entrambi i campi sono vuoti, il totale rimane vuoto
        if (quantityInput.value.trim() === "" && unitCostInput.value.trim() === "") {
          totalElement.textContent = "";
        } else {
          const quantity = parseFloat(quantityInput.value) || 0;
          const unitCost = parseFloat(unitCostInput.value.replace(/\./g, '').replace(',', '.')) || 0;
          const total = quantity * unitCost;
          totalElement.textContent = total.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          overallTotal += total;
        }
      }
    });
  
    const overallTotalElement = document.getElementById('overall-total');
    if (overallTotalElement) {
      if (overallTotal === 0) {
        overallTotalElement.textContent = "";
      } else {
        overallTotalElement.textContent = overallTotal.toLocaleString("it-IT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  
    calculateSaldo();
  }
  
  // --------------- FORMATTAZIONE GENERICA DEGLI INPUT (Italiano) ---------------
  function formatInputToItalian(input) {
    if (input.value.trim() === "") {
      return;
    }
  
    const value = input.value.replace(/\./g, '').replace(',', '.');
    const number = parseFloat(value);
  
    if (!isNaN(number)) {
      input.value = number.toLocaleString("it-IT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      input.value = "";
    }
  
    calculateSaldo();
  }
  
  // --------------- CALCOLO DEL SALDO (Acconti e Totale) ---------------
  function calculateSaldo() {
    const overallTotalText = document.getElementById("overall-total")?.textContent || "";
    const acconto1Text = document.getElementById("acconto1")?.value || "";
    const acconto2Text = document.getElementById("acconto2")?.value || "";
  
    const overallTotal = overallTotalText.trim() === "" ? 0 : parseFloat(overallTotalText.replace(/\./g, '').replace(',', '.')) || 0;
    const acconto1 = acconto1Text.trim() === "" ? 0 : parseFloat(acconto1Text.replace(/\./g, '').replace(',', '.')) || 0;
    const acconto2 = acconto2Text.trim() === "" ? 0 : parseFloat(acconto2Text.replace(/\./g, '').replace(',', '.')) || 0;
  
    const saldo = overallTotal - acconto1 - acconto2;
    const saldoInput = document.getElementById("saldo");
  
    if (saldoInput) {
      if (overallTotal === 0 && acconto1 === 0 && acconto2 === 0) {
        saldoInput.value = "";
      } else {
        saldoInput.value = saldo.toLocaleString("it-IT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
      // Cambia colore se il saldo è negativo
      saldoInput.style.color = saldo < 0 ? "red" : "#ab790d";
    }
  
    // Se il campo acconto1 è vuoto, lascia vuoto anche data_acconto1
    const dataAcconto1Input = document.getElementById("data_acconto1");
    if (dataAcconto1Input && document.getElementById("acconto1").value.trim() === "") {
      dataAcconto1Input.value = "";
    }
    // Se il campo acconto2 è vuoto, lascia vuoto anche data_acconto2
    const dataAcconto2Input = document.getElementById("data_acconto2");
    if (dataAcconto2Input && document.getElementById("acconto2").value.trim() === "") {
      dataAcconto2Input.value = "";
    }
    // Se il campo saldo è vuoto, lascia vuoto anche data_saldo
    const dataSaldoInput = document.getElementById("data_saldo");
    if (dataSaldoInput && saldoInput.value.trim() === "") {
      dataSaldoInput.value = "";
    }
  }
  
  // --------------- CONVERSIONE DEL TESTO IN MAIUSCOLO ---------------
  function forceUpperCase(input) {
    input.value = input.value.toUpperCase();
  }
  
  // --------------- VALIDAZIONE DEL CODICE FISCALE ---------------
  function validateCodiceFiscale(input) {
    const codice = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    input.value = codice;
    checkCodiceFiscaleLength(input);
  }
  
  function checkCodiceFiscaleLength(input) {
    const errorMsg = document.getElementById("codice-fiscale-error");
    if (input.value.length !== 16) {
      showError(input, errorMsg, "immettere 16 caratteri");
    } else {
      hideError(input, errorMsg);
    }
  }
  
  // --------------- VALIDAZIONE DEL CAP ---------------
  function validateCAP(input) {
    const errorMsg = document.getElementById("cap-error");
    const capValue = input.value.trim();
    const capPattern = /^[0-9]{5}$/;
    if (!capPattern.test(capValue)) {
      showError(input, errorMsg, "immettere 5 numeri");
    } else {
      hideError(input, errorMsg);
    }
  }
  
  // --------------- VALIDAZIONE DELL'EMAIL ---------------
  function validateEmail(input) {
    const errorMsg = document.getElementById("email-error");
    const emailValue = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      showError(input, errorMsg, "inserisci email valida");
    } else {
      hideError(input, errorMsg);
    }
  }
  
  // --------------- FUNZIONI PER GESTIRE GLI ERRORI ---------------
  function showError(input, errorMsgElement, message) {
    errorMsgElement.textContent = message;
    errorMsgElement.style.display = "block";
    input.style.border = "1px solid red";
  }
  
  function hideError(input, errorMsgElement) {
    errorMsgElement.style.display = "none";
    input.style.border = "1px solid #ccc";
  }
  
  // --------------- VALIDAZIONE DEL NUMERO DI TELEFONO (intl-tel-input) ---------------
  document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#telefono");
    const iti = window.intlTelInput(input, {
      initialCountry: "it",
      separateDialCode: false,
      formatOnDisplay: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
  
    function setInitialPrefix() {
      const prefisso = `+${iti.getSelectedCountryData().dialCode} `;
      if (!input.value.startsWith(prefisso)) {
        input.value = prefisso;
      }
      input.setSelectionRange(prefisso.length, prefisso.length);
    }
    setInitialPrefix();
  
    input.addEventListener("countrychange", function () {
      const numeroAttuale = input.value.replace(/^\+\d+\s*/, "").trim();
      const nuovoPrefisso = `+${iti.getSelectedCountryData().dialCode} `;
      input.value = nuovoPrefisso + numeroAttuale;
      input.setSelectionRange(input.value.length, input.value.length);
    });
  
    input.addEventListener("input", function () {
      const prefisso = `+${iti.getSelectedCountryData().dialCode} `;
      if (!input.value.startsWith(prefisso)) {
        input.value = prefisso;
      }
      const numero = input.value.replace(prefisso, "").replace(/[^\d\s]/g, "").trim();
      input.value = prefisso + numero;
      input.setSelectionRange(input.value.length, input.value.length);
    });
  
    input.addEventListener("blur", function () {
      const errorMsg = document.getElementById("telefono-error");
      if (!iti.isValidNumber()) {
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
      }
    });
  });
  


  // --------------- IMPOSTAZIONE DELLA DATA PER data_saldo ---------------
  document.addEventListener('DOMContentLoaded', function() {
    const dataPartenzaInput = document.getElementById('data_partenza');
    const dataSaldoInput = document.getElementById('data_saldo');
  
    // Funzione per formattare una data in formato locale "YYYY-MM-DD"
    function formatDateLocal(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // i mesi in JS vanno da 0 a 11
      const day = date.getDate();
      // Aggiunge lo zero iniziale se necessario
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
  
    function updateDataSaldo() {
      // Se non è impostata la data di partenza, lascia vuoto data_saldo
      if (!dataPartenzaInput.value) {
        dataSaldoInput.value = "";
        return;
      }
      
      // Parsiamo la data di partenza in locale
      const parts = dataPartenzaInput.value.split("-");
      const dataPartenza = new Date(parts[0], parts[1] - 1, parts[2]); // Crea la data in ora locale
  
      // Calcola la data saldo sottraendo 2 mesi
      const dataSaldoCandidate = new Date(dataPartenza);
      dataSaldoCandidate.setMonth(dataSaldoCandidate.getMonth() - 2);
      dataSaldoCandidate.setHours(0, 0, 0, 0);
  
      // Ottieni la data odierna in ora locale
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Se la data calcolata è precedente ad oggi, usa oggi come data saldo
      if (dataSaldoCandidate < today) {
        dataSaldoCandidate.setTime(today.getTime());
      }
  
      // Imposta il campo data_saldo con la data formattata in locale
      dataSaldoInput.value = formatDateLocal(dataSaldoCandidate);
    }
  
    if (dataPartenzaInput && dataSaldoInput) {
      updateDataSaldo();
      dataPartenzaInput.addEventListener('change', updateDataSaldo);
    }
  });



// ------------- FORMATO DATA VUOTO SE ACCONTO VUOTO -------------------
function updateDateFieldForPayment(paymentFieldId, dateFieldId) {
    const paymentField = document.getElementById(paymentFieldId);
    const dateField = document.getElementById(dateFieldId);
    if (paymentField && dateField) {
      if (paymentField.value.trim() === "") {
        dateField.classList.add("inputdata");
      } else {
        dateField.classList.remove("inputdata");
      }
    }
  }
  
  // Funzione generica per aggiornare la classe del campo data in base al contenuto del campo di pagamento
function updateDateFieldForPayment(paymentFieldId, dateFieldId) {
    const paymentField = document.getElementById(paymentFieldId);
    const dateField = document.getElementById(dateFieldId);
    
    if (paymentField && dateField) {
      // Se il campo di pagamento è vuoto, aggiungi la classe "inputdata" al campo data
      if (paymentField.value.trim() === "") {
        dateField.classList.add("inputdata");
      } else {
        // Altrimenti, rimuovi la classe "inputdata"
        dateField.classList.remove("inputdata");
      }
    }
  }
  
  // All'avvio della pagina e ad ogni modifica dei campi acconto1 e acconto2,
  // aggiorna il relativo campo data
  document.addEventListener("DOMContentLoaded", function() {
    // Acconto1 e Data Acconto1
    const acconto1 = document.getElementById("acconto1");
    if (acconto1) {
      // Aggiorna subito lo stato del campo data
      updateDateFieldForPayment("acconto1", "data_acconto1");
      // Ogni volta che il contenuto di acconto1 cambia, aggiorna il campo data
      acconto1.addEventListener("input", function() {
        updateDateFieldForPayment("acconto1", "data_acconto1");
      });
    }
    
    // Acconto2 e Data Acconto2
    const acconto2 = document.getElementById("acconto2");
    if (acconto2) {
      updateDateFieldForPayment("acconto2", "data_acconto2");
      acconto2.addEventListener("input", function() {
        updateDateFieldForPayment("acconto2", "data_acconto2");
      });
    }
  });


// ------------------------------------------------------------
// DATA ODIERNA IN ACCONTO SE MAGGIORE DI ZERO
// ------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Recupera i campi di pagamento e i relativi campi data
    const acconto1 = document.getElementById("acconto1");
    const dataAcconto1 = document.getElementById("data_acconto1");
    const acconto2 = document.getElementById("acconto2");
    const dataAcconto2 = document.getElementById("data_acconto2");
  
    // Funzione per formattare la data odierna in formato "YYYY-MM-DD"
    function getTodayFormatted() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    // Funzione che controlla il valore del campo pagamento e aggiorna il relativo campo data
    function updateDateField(paymentField, dateField) {
      // Rimuove eventuali spazi e sostituisce eventuali virgole con punto per la conversione
      const paymentVal = paymentField.value.trim();
      const numericVal = parseFloat(paymentVal.replace(/\./g, '').replace(',', '.'));
      
      // Se il valore è un numero maggiore di 0
      if (!isNaN(numericVal) && numericVal > 0) {
        // Se il campo data è vuoto, imposta la data odierna
        if (dateField.value.trim() === "") {
          dateField.value = getTodayFormatted();
        }
      } else {
        // Se il valore non è > 0, svuota il campo data
        dateField.value = "";
      }
    }
  
    // Aggiunge un listener "input" per acconto1 e aggiorna data_acconto1
    if (acconto1 && dataAcconto1) {
      acconto1.addEventListener('input', function() {
        updateDateField(acconto1, dataAcconto1);
      });
      // Aggiornamento iniziale al caricamento della pagina (se già valorizzato)
      updateDateField(acconto1, dataAcconto1);
    }
  
    // Aggiunge un listener "input" per acconto2 e aggiorna data_acconto2
    if (acconto2 && dataAcconto2) {
      acconto2.addEventListener('input', function() {
        updateDateField(acconto2, dataAcconto2);
      });
      updateDateField(acconto2, dataAcconto2);
    }
  });


// ------------------------------------------------------------
// CHECKBOX UNA SOLA SELEZIONE
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i checkbox della sezione Viaggio (identificati dal name="viaggio")
  const travelCheckboxes = document.querySelectorAll('input[name="viaggio"]');

  travelCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        // Deselect all other checkboxes in the group
        travelCheckboxes.forEach(otherCheckbox => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
});

 // Funzione per autoespandere il textarea
 function autoExpand(field) {
  // Resetta l'altezza per calcolare lo scrollHeight corretto
  field.style.height = 'inherit';

  // Calcola l'altezza necessaria
  const computed = window.getComputedStyle(field);
  const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';
}

// Aggiungi l'evento di input per ogni textarea con la classe "input-min"
document.addEventListener('input', function(event) {
  if (event.target.matches('textarea.input-min')) {
    autoExpand(event.target);
  }
});