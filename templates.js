function getPokemonTemplate(data, name, secondType) {
    let firstType = data.types[0].type.name.toLowerCase();
    
    return `
    <div class="pokemon-card ${firstType}">
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