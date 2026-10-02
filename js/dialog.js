let dialog = document.getElementById('pokemon-dialog');
let currentPokemonId;
let pokemonCount;

async function openDialog(id) {
    currentPokemonId = id;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemon = await response.json();

    dialog.innerHTML = getDialogTemplate(pokemon);

    if (!dialog.open) {
        dialog.showModal();
    }
}

dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

async function getPokemonCount() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1');
    let pokemon = await response.json();

    pokemonCount = pokemon.count;
}

function nextDialogPokemon() {
    if (currentPokemonId < pokemonCount) {
        currentPokemonId += 1;
        openDialog(currentPokemonId);
    }
}

function previousDialogPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId -= 1;
        openDialog(currentPokemonId);
    }
}

getPokemonCount();