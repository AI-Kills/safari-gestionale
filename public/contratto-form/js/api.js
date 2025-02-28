const GEONAMES_USERNAME = "TuoUsername"; // Registrati su geonames.org e metti il tuo username qui

async function searchComune(inputId, provinciaId, capId) {
    let input = document.getElementById(inputId);
    let filter = input.value.toLowerCase();

    if (filter.length < 2) return; // Evita troppe richieste con input breve

    try {
        let response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${filter}&country=IT&maxRows=5&username=${GEONAMES_USERNAME}`);
        let data = await response.json();

        if (data.postalCodes.length > 0) {
            showAutocomplete(data.postalCodes, inputId, provinciaId, capId);
        }
    } catch (error) {
        console.error("Errore nel caricamento dei comuni:", error);
    }
}

function showAutocomplete(data, inputId, provinciaId, capId) {
    let input = document.getElementById(inputId);
    let listaSuggerimenti = document.createElement("div");
    listaSuggerimenti.setAttribute("class", "autocomplete-list");

    closeSuggestions(); // Pulisce eventuali suggerimenti precedenti

    data.forEach(comune => {
        let suggestion = document.createElement("div");
        suggestion.innerHTML = `<strong>${comune.placeName}</strong> (${comune.adminCode2}) - ${comune.postalCode}`;
        suggestion.addEventListener("click", function () {
            input.value = comune.placeName;
            document.getElementById(provinciaId).value = comune.adminCode2;
            document.getElementById(capId).value = comune.postalCode;
            closeSuggestions();
        });
        listaSuggerimenti.appendChild(suggestion);
    });

    input.parentNode.appendChild(listaSuggerimenti);
}

// Chiude i suggerimenti
function closeSuggestions() {
    document.querySelectorAll(".autocomplete-list").forEach(el => el.remove());
}

// Chiude la lista se l'utente clicca fuori
document.addEventListener("click", closeSuggestions);