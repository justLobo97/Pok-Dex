
let nextUrl;
let isSearching = false;

async function getPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let pokemon = await response.json();
    nextUrl = pokemon.next;

    for (let i = 0; i < pokemon.results.length; i++) {

        let response = await fetch(pokemon.results[i].url);
        let data = await response.json();
        renderPokemon(data, pokemon.results[i].name);
    }
}

function renderPokemon(data, name) {
    let secondType;

    if (data.types.length === 2) {
        secondType = data.types[1].type.name.toUpperCase();
    }
    else {
        secondType = "";
    }

    document.getElementById('pokemon-card').innerHTML += getPokemonTemplate(data, name, secondType);

}

async function nextPokemon() {
    let response = await fetch(nextUrl);
    let pokemon = await response.json();
    nextUrl = pokemon.next;

    for (let i = 0; i < pokemon.results.length; i++) {

        let response = await fetch(pokemon.results[i].url);
        let data = await response.json();
        renderPokemon(data, pokemon.results[i].name);
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


        for (let i = 0; i < pokemon.results.length; i++) {

            if (pokemon.results[i].name.startsWith(searchInput)) {
                let response = await fetch(pokemon.results[i].url);
                let data = await response.json();
                renderPokemon(data, pokemon.results[i].name);
            }
        }
    }
}