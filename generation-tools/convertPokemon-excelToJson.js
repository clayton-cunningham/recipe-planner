const { getPokemon } = require("./excelToJson");

const keys = [
    "id",
    "name",
    "ingredient_1",
    "ingredient_2",
    "ingredient_3",
]

const keyIndexes = [
    0,
    3,
    8,
    9,
    10,
]

getPokemon("pokedex", keys, keyIndexes);