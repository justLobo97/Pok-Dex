function getPokemonTemplate(data, name, secondType) {
    return `
    <div class="pokemon-card">
        <div class="card-header">
            <p>#${data.id}</p>
            <p>${name.toUpperCase()}</p>
         </div>
    
         <img src="${data.sprites.front_default}">

        <div class="pokemon-types">
            <span>${data.types[0].type.name.toUpperCase()}</span>
            <span>${secondType}</span>
        </div>
    </div>`
}