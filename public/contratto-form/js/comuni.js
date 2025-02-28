async function fetchComuni() {
    try {
        let response = await fetch("json/comuni.json"); // Percorso aggiornato
        let comuniData = await response.json();
        return comuniData;
    } catch (error) {
        console.error("Errore nel caricamento dei comuni:", error);
        return [];
    }
}

async function searchComune(inputId, provinciaId) {
    let input = document.getElementById(inputId);
    let filter = input.value.toLowerCase();

    if (filter.length < 2) return; // Evita troppe richieste con input breve

    let comuniData = await fetchComuni();
    let comuniFiltrati = comuniData.filter(comune => comune.nome.toLowerCase().startsWith(filter));

    showAutocomplete(comuniFiltrati, inputId, provinciaId);
}

function showAutocomplete(data, inputId, provinciaId) {
    let input = document.getElementById(inputId);
    let listaSuggerimenti = document.createElement("div");
    listaSuggerimenti.setAttribute("class", "autocomplete-list");

    closeSuggestions(); // Pulisce eventuali suggerimenti precedenti

    data.forEach(comune => {
        let nomeComune = comune.nome.toUpperCase(); // Trasforma in MAIUSCOLO
        let siglaProvincia = comune.sigla.toUpperCase(); // Sigla provincia sempre in MAIUSCOLO

        let suggestion = document.createElement("div");
        suggestion.innerHTML = `<strong>${nomeComune}</strong> (${siglaProvincia})`;

        suggestion.addEventListener("click", function () {
            input.value = nomeComune; // Inserisce il nome in maiuscolo nel campo input
            document.getElementById(provinciaId).value = siglaProvincia; // Inserisce la sigla provincia in maiuscolo
            closeSuggestions();
        });

        listaSuggerimenti.appendChild(suggestion);
    });

    input.parentNode.appendChild(listaSuggerimenti);
}