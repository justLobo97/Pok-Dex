
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

    let loadingScreen = document.getElementById('loading-screen');

    loadingScreen.classList.add('show');

    await new Promise(resolve => setTimeout(resolve, 2500));

    let response = await fetch(nextUrl);
    let pokemon = await response.json();
    await loadPokemon(pokemon.results, false);

    nextUrl = pokemon.next;
    hasLoadedMore = true;

    document.getElementById('back-to-top').classList.add('show');

    loadingScreen.classList.remove('show');
}

async function loadPokemon(results, newCard) {

    for (let i = 0; i < results.length; i++) {

        let response = await fetch(results[i].url);
        let data = await response.json();
        renderPokemon(data, results[i].name, newCard);
    }
}

function renderPokemon(data, name, newCard) {

    let secondType = getSecondType(data);

    if (newCard) {
        newCards += getPokemonTemplate(data, name, secondType);
    }
    else {
        document.getElementById('pokemon-card').innerHTML += getPokemonTemplate(data, name, secondType);
    }
}

function getSecondType(data) {

    if (data.types.length === 2) {
        return data.types[1].type.name.toUpperCase();
    }

    return "";
}

async function searchPokemon() {

    let searchInput = document.getElementById('search-pokemon').value.toLowerCase();

    if (searchInput.length < 3 && isSearching === true) {
        document.querySelector('.load-more').style.display = 'block';
        document.getElementById('pokemon-card').innerHTML = "";
        isSearching = false;
        getPokemon();
        return;
    }

    if (searchInput.length >= 3) {
        isSearching = true;
        document.querySelector('.load-more').style.display = 'none';

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