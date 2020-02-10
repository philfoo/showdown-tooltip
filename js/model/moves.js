const moveData = require("./../../data/rand-moves.js");

/*
* @param    {string arr}    pokemonTeam     node id which identifies the div that the battle is contained in
* @return   {dictionary}    pokemonMoves    dictionary of pokemon (str) -> moves (str arr)       
*/
function getPokemonMoves(pokemonTeam) {
    let pokemonMoves = {};

    for (let pokemonStr of pokemonTeam) {
        let pokemon = pokemonStr.toLowerCase();

        if (pokemon.includes('not revealed')) continue;

        // Fetch pokemon name e.g. 'dugtrio' if 'dugtrio-alolan'
        let pokemonLookupKey = pokemon.split(" ")[0];
        pokemonLookupKey = pokemon.includes('alola') ? (pokemonLookupKey + 'alola') : pokemonLookupKey;
        pokemonLookupKey = pokemon.includes('galar') ? (pokemonLookupKey + 'galar') : pokemonLookupKey;

        let pokemonInfo = moveData.BattleFormatsData[pokemonLookupKey]
        if (pokemonInfo !== undefined && ("randomBattleMoves" in pokemonInfo)) {
            pokemonMoves[pokemonLookupKey] = pokemonInfo["randomBattleMoves"];
        }
    }

    return pokemonMoves;
}

module.exports = {
    getPokemonMoves: getPokemonMoves
}