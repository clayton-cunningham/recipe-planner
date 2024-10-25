const { getPokemon } = require("./excelToJson");

const keys = [
    "DexNumber",
    "Pokemon",
]

const keyIndexes = [
    1,
    4,
]

getPokemon("pokemonBox", keys, keyIndexes);