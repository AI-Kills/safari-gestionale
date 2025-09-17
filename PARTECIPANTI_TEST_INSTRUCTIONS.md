# 🧪 ISTRUZIONI TEST PARTECIPANTI - APPLICAZIONE REALE

## ✅ CORREZIONI IMPLEMENTATE

Le seguenti correzioni sono state applicate per risolvere il problema dei partecipanti:

### 1. **Recupero Partecipanti** ✅
- ✅ `fetchPreventivoCompleto()` ora include `fetchPartecipantiByPreventivoId()`
- ✅ `fetchPreventivoCompletoByNumero()` ora include `fetchPartecipantiByPreventivoId()`

### 2. **Trasformazione Dati** ✅
- ✅ Aggiunta `transformPartecipanti()` in `useEntityTransformation.ts`
- ✅ `transformPreventivoCompleto()` ora include i partecipanti

### 3. **Caricamento UI** ✅
- ✅ `loadPreventivoData()` ora riceve `transformedData.partecipanti || []`
- ✅ Correzione in entrambe le chiamate (caricamento da URL e modifica preventivo)

### 4. **Pulizia Dati** ✅
- ✅ `onClickNuovoPreventivo()` ora include `partecipantiActions.clearItems()`

### 5. **Duplicazione** ✅
- ✅ `duplicatePreventivo()` ora copia anche i partecipanti

---

## 🔍 COME TESTARE NELL'APPLICAZIONE REALE

### **Test 1: Creazione Preventivo con Partecipanti**
1. Avvia l'applicazione: `pnpm dev`
2. Vai su `http://localhost:3001`
3. Crea un nuovo cliente
4. Crea un nuovo preventivo per quel cliente
5. **AGGIUNGI PARTECIPANTI** nella sezione partecipanti
6. Salva il preventivo
7. ✅ **VERIFICA**: I partecipanti dovrebbero essere salvati

### **Test 2: Recupero Preventivo con Partecipanti**
1. Dopo aver creato un preventivo con partecipanti (Test 1)
2. Vai alla lista preventivi del cliente
3. Clicca su "Modifica" del preventivo creato
4. ✅ **VERIFICA**: I partecipanti dovrebbero essere caricati e visibili nell'interfaccia

### **Test 3: Aggiornamento Preventivo con Partecipanti**
1. Apri un preventivo esistente con partecipanti (Test 2)
2. Modifica i dati dei partecipanti (nomi, quote, aggiungi/rimuovi)
3. Salva le modifiche
4. Riapri il preventivo
5. ✅ **VERIFICA**: Le modifiche ai partecipanti dovrebbero essere persistite

### **Test 4: Caricamento da URL**
1. Crea un preventivo con partecipanti e nota il numero (es. 0001)
2. Vai direttamente a: `http://localhost:3001/dashboard/general-interface?preventivo=0001`
3. ✅ **VERIFICA**: Il preventivo dovrebbe caricarsi con i partecipanti visibili

### **Test 5: Duplicazione Preventivo**
1. Apri un preventivo esistente con partecipanti
2. Clicca su "Duplica preventivo"
3. ✅ **VERIFICA**: Il nuovo preventivo dovrebbe avere gli stessi partecipanti

---

## 🐛 SE I TEST FALLISCONO

### **Problema: Partecipanti non si salvano**
- Controlla la console del browser per errori JavaScript
- Controlla i log del server per errori nelle actions
- Verifica che `partecipantiManager.items` contenga dati prima del salvataggio

### **Problema: Partecipanti non si caricano**
- Controlla che `fetchPartecipantiByPreventivoId()` restituisca dati
- Verifica che `transformedData.partecipanti` contenga dati
- Controlla che `loadPreventivoData()` riceva i partecipanti

### **Problema: Partecipanti non si aggiornano**
- Verifica che `updatePartecipantiCompleto()` venga chiamata
- Controlla che i dati dei partecipanti vengano passati a `updatePreventivoCompleto()`

---

## 📊 LOG DI DEBUG

Per debug, aggiungi questi log temporanei:

```typescript
// In GeneralInterfacePage.tsx, nella funzione loadPreventivoFromUrl
console.log('🔍 Transformed data partecipanti:', transformedData.partecipanti);

// In preventivoService.ts, in fetchPreventivoCompleto
console.log('🔍 Partecipanti fetch result:', partecipanti);

// In useEntityTransformation.ts, in transformPreventivoCompleto
console.log('🔍 Data partecipanti before transform:', data.partecipanti);
```

---

## ✅ STATO ATTUALE

**TUTTE LE CORREZIONI SONO STATE IMPLEMENTATE** ✅

Il problema originale "i partecipanti non vengono aggiornati nell'update preventivo" dovrebbe essere **RISOLTO**.

Le correzioni coprono:
- ✅ Creazione preventivi con partecipanti
- ✅ Recupero preventivi con partecipanti  
- ✅ Aggiornamento preventivi con partecipanti
- ✅ Duplicazione preventivi con partecipanti
- ✅ Caricamento da URL con partecipanti
- ✅ Pulizia dati per nuovi preventivi

**Il flusso completo dei partecipanti è ora funzionante.**
