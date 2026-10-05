let dialog = document.getElementById('pokemon-dialog');
let currentPokemonId;
let pokemonCount;


async function openDialog(id, focusedButton) {
    currentPokemonId = id;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemon = await response.json();

    let previousButton = getPreviousButton();
    let firstType = pokemon.types[0].type.name;
    let secondType = getDialogSecondType(pokemon);
    let firstAbility = pokemon.abilities[0].ability.name;
    let secondAbility = getDialogSecondAbility(pokemon);
    let pokemonId = pokemon.id.toString().padStart(5, "0");

    dialog.innerHTML = getDialogTemplate(pokemon, pokemonId, firstType, secondType, firstAbility, secondAbility, previousButton);

    if (focusedButton) {
        document.querySelector(`.${focusedButton}-button`).focus();
    }

    if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
    }
}

dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

dialog.addEventListener('close', function () {
    document.body.style.overflow = '';
});

async function getPokemonCount() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1');
    let pokemon = await response.json();

    pokemonCount = pokemon.count;
}

function getDialogSecondType(pokemon) {
    let secondType;

    if (pokemon.types.length === 2) {
        secondType = `<span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name.toUpperCase()}</span>`;
    }
    else {
        secondType = "";
    }

    return secondType;
}

function getDialogSecondAbility(pokemon) {
    let secondAbility;

    if (pokemon.abilities.length === 2) {
        secondAbility = `<span>${pokemon.abilities[1].ability.name.toUpperCase()}</span>`;
    }

    else {
        secondAbility = "";
    }

    return secondAbility;
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

function getPreviousButton() {
    if (currentPokemonId > 1) {
        return `<button class="previous-button" onclick="previousDialogPokemon()"><</button>`;
    }

    return "";
}

getPokemonCount();