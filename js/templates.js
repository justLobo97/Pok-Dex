function getPokemonTemplate(data, name, secondType) {
    let firstType = data.types[0].type.name.toLowerCase();

    return `
    <div class="pokemon-card ${firstType}" onclick="openDialog(${data.id})">
        <div class="card-header">
            <p>#${data.id}</p>
            <p>${name.toUpperCase()}</p>
        </div>

        <div class="pokemon-image">
        <img src="${data.sprites.front_default}">
        </div>

        <div class="pokemon-types">
            <span>${data.types[0].type.name.toUpperCase()}</span>
            <span>${secondType}</span>
        </div>
    </div>`
}

function getDialogTemplate(pokemon) {
    let secondType;
    let secondAbility;

    if (pokemon.types.length === 2) {
        secondType = `<span class="${pokemon.types[1].type.name}">${pokemon.types[1].type.name.toUpperCase()}</span>`;
    }
    else {
        secondType = "";
    }

    if (pokemon.abilities.length === 2) {
        secondAbility = `<span>${pokemon.abilities[1].ability.name.toUpperCase()}</span>`;
    }

    else {
        secondAbility = "";
    }

    return `
    <div class="dialog-content">

        <div class="dialog-header">
            <p>#${pokemon.id.toString().padStart(5, "0")}</p>
            <p>${pokemon.name.toUpperCase()}</p>
        </div>

        <div class="dialog-image">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>

         <div class="dialog-types">
            <span class="${pokemon.types[0].type.name}">${pokemon.types[0].type.name.toUpperCase()}</span>
            ${secondType}
        </div>

        <div class="pokemon-info">
            <p><span>HEIGHT: </span>${pokemon.height / 10}M</p>
            <p><span>WEIGHT: </span>${pokemon.weight / 10}KG</p>
            <p><span>BASE-EXP: </span>${pokemon.base_experience}</p>
            <div class="pokemon-abilities">
                <p>ABILITIES:</p>
                <div class="ability-list">
                    <span>${pokemon.abilities[0].ability.name.toUpperCase()}</span>
                    ${secondAbility}
                </div>
            </div>
            
        </div>

    </div>

        <div class="dialog-buttons">
            <button class="previous-button" onclick="previousDialogPokemon()"><</button>
            <button class="close-button" onclick="dialog.close()">X</button>
            <button class="next-button" onclick="nextDialogPokemon()">></button>
        </div>`
}