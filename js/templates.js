function getPokemonTemplate(data, name, firstType, secondType) {
    
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
            <span>${firstType.toUpperCase()}</span>
            <span>${secondType}</span>
        </div>
    </div>`
}

function getDialogTemplate(pokemon, pokemonId, firstType, secondType, firstAbility, secondAbility, previousButton) {

    return `
    <div class="dialog-content">

        <div class="dialog-header">
            <p>#${pokemonId}</p>
            <p>${pokemon.name.toUpperCase()}</p>
        </div>

        <div class="dialog-image">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>

         <div class="dialog-types">
            <span class="${firstType}">${firstType.toUpperCase()}</span>
            ${secondType}
        </div>

        <div class="pokemon-info">
            <p><span>HEIGHT: </span>${pokemon.height / 10}M</p>
            <p><span>WEIGHT: </span>${pokemon.weight / 10}KG</p>
            <p><span>BASE-EXP: </span>${pokemon.base_experience}</p>
            <div class="pokemon-abilities">
                <p>ABILITIES:</p>
                <div class="ability-list">
                    <span>${firstAbility.toUpperCase()}</span>
                    ${secondAbility}
                </div>
            </div>
            
        </div>

    </div>

        <div class="dialog-buttons">
            ${previousButton}
            <button class="close-button" onclick="dialog.close()">X</button>
            <button class="next-button" onclick="nextDialogPokemon()">></button>
        </div>`
}