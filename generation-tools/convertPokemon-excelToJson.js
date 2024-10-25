const { getPokemon } = require("./excelToJson");

const keys = [
    "dexNumber",
    "name",
    "berry",
    "ingredient_1",
    "ingredient_2",
    "ingredient_3",
]

const keyIndexes = [
    1,
    4,
    9,
    10,
    11,
    12,
]

getPokemon("pokedex", keys, keyIndexes);