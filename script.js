

async function getPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let pokemon = await response.json();

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

