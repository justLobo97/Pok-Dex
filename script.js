
let nextUrl;
let isSearching = false;
let hasLoadedMore = false;
let newCards = "";

async function getPokemon(newCard) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let pokemon = await response.json();
    await loadPokemon(pokemon.results, newCard);
    nextUrl = pokemon.next;

    if (newCard) {
        document.getElementById('pokemon-card').innerHTML = newCards;
        newCards = "";
    }
}

async function nextPokemon() {
    let response = await fetch(nextUrl);
    let pokemon = await response.json();
    await loadPokemon(pokemon.results, false);

    nextUrl = pokemon.next;
    hasLoadedMore = true;
    document.getElementById('back-to-top').classList.add('show');
}

async function loadPokemon(results, newCard) {
    for (let i = 0; i < results.length; i++) {

        let response = await fetch(results[i].url);
        let data = await response.json();
        renderPokemon(data, results[i].name, newCard);
    }
}

function renderPokemon(data, name, newCard) {
    let secondType;

    if (data.types.length === 2) {
        secondType = data.types[1].type.name.toUpperCase();
    }
    else {
        secondType = "";
    }

    if (newCard) {
        newCards += getPokemonTemplate(data, name, secondType);
    }
    else {
        document.getElementById('pokemon-card').innerHTML += getPokemonTemplate(data, name, secondType);
    }
}

async function searchPokemon() {

    let searchInput = document.getElementById('search-pokemon').value.toLowerCase();

    if (searchInput.length < 3 && isSearching === true) {
        document.getElementById('pokemon-card').innerHTML = "";
        isSearching = false;
        getPokemon();
        return;
    }

    if (searchInput.length >= 3) {
        isSearching = true;
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000');
        let pokemon = await response.json();
        document.getElementById('pokemon-card').innerHTML = "";
        searchResults(pokemon, searchInput);
    }
}

async function searchResults(pokemon, searchInput) {
    for (let i = 0; i < pokemon.results.length; i++) {

        if (pokemon.results[i].name.startsWith(searchInput)) {
            let response = await fetch(pokemon.results[i].url);
            let data = await response.json();
            renderPokemon(data, pokemon.results[i].name);
        }
    }
}

function backToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    checkScroll();
}

function checkScroll() {

    if (window.scrollY === 0) {
        document.getElementById('back-to-top').classList.remove('show');
        getPokemon(true);
    }
    else {
        requestAnimationFrame(checkScroll);
    }
}