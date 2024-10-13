import { useEffect, useState } from "react";
import { BoxEntry, IngredientLevel, ingredients, Pokemon, Recipe, RecipePossibility, recipes } from "../../../assets/resources";
import "./Recipes.less";
import { RecipeOptions } from "./RecipeOptions"
import { Row } from "../../generic/Row";

export const Recipes = (props: {weeklyPokemon: Pokemon[], weeklyRecipe: string, ownedPokemon: BoxEntry[]}) => {

    const {weeklyPokemon, weeklyRecipe, ownedPokemon} = props;
    const [column1Recipes, setColumn1Recipes] = useState<Recipe[]>([]);
    const [column2Recipes, setColumn2Recipes] = useState<Recipe[]>([]);
    const [column3Recipes, setColumn3Recipes] = useState<Recipe[]>([]);
    const [column4Recipes, setColumn4Recipes] = useState<Recipe[]>([]);
    const [column1Ingredients, setColumn1Ingredients] = useState<string[]>([]);
    const [column2Ingredients, setColumn2Ingredients] = useState<string[]>([]);
    const [column3Ingredients, setColumn3Ingredients] = useState<string[]>([]);
    const [column4Ingredients, setColumn4Ingredients] = useState<string[]>([]);

    useEffect(() => {
        const selectedDexEntries = weeklyPokemon.filter(tP => ownedPokemon.find(oP => oP.id == tP.id && oP.Perf) != undefined);

        // Get ingredients possible with selected pokemon & ingredent levels
        var possibleIngredients = selectedDexEntries
            .map(p => p.ingredient_1)
            .concat(selectedDexEntries.filter(p => ownedPokemon.find(oP => oP.id == p.id && oP.Perf && (oP.ingredientLevel == IngredientLevel.Lvl30 || oP.ingredientLevel == IngredientLevel.Lvl60)) != undefined).map(p => p.ingredient_2))
            .concat(selectedDexEntries.filter(p => ownedPokemon.find(oP => oP.id == p.id && oP.Perf && oP.ingredientLevel == IngredientLevel.Lvl60) != undefined).map(p => p.ingredient_3));
        
        // Get ingredients possible with higher levels on selected pokemon
        var higherLvlIngredients = selectedDexEntries.map(p => p.ingredient_2).concat(
                selectedDexEntries.map(p => p.ingredient_3)
            ).filter(i => !possibleIngredients.includes(i));

        // Get ingredients possible with other pokemon for the week's favorite berries
        const nonSelectedDexEntries = weeklyPokemon.filter(tP => ownedPokemon.find(oP => oP.id == tP.id && !oP.Perf) != undefined);
        var otherMonIngredients = nonSelectedDexEntries.map(p => p.ingredient_1).concat(nonSelectedDexEntries.map(p => p.ingredient_2)).concat(nonSelectedDexEntries.map(p => p.ingredient_3))
            .filter(i => !possibleIngredients.includes(i));

        // Get all other ingredients
        var impossibleIngredients = ingredients.map(i => i.name)
            .filter(i => 
                !possibleIngredients.includes(i) &&
                !higherLvlIngredients.includes(i) &&
                !otherMonIngredients.includes(i)
            );
        var lvl0Recipes: Recipe[] = [];
        var lvl30Recipes: Recipe[] = [];
        var lvl60Recipes: Recipe[] = [];
        var impossibleRecipes: Recipe[] = [];

        // Sort the recipes into each category
        recipes.filter(r => r.Type == weeklyRecipe).forEach(recipe => {
            var missingForSelected = false;
            var missingForHigherLevels = false;
            var missingForOthers = false;
            ingredients.forEach(ingredient => {
                var iCount = recipe[ingredient.name as keyof typeof recipe];

                if (iCount != undefined){
                    if (iCount != "0" && possibleIngredients.find(i => i == ingredient.name) == undefined) {
                        missingForSelected = true;
                        if (iCount != "0" && higherLvlIngredients.find(i => i == ingredient.name) == undefined) {
                            missingForHigherLevels = true;
                        }
                        if (iCount != "0" && otherMonIngredients.find(i => i == ingredient.name) == undefined) {
                            missingForOthers = true;
                        }
                    }
                }
            })

            if (!missingForSelected) {
                lvl0Recipes.push(recipe);
            }
            else {
                if (!missingForHigherLevels) {
                    lvl30Recipes.push(recipe);
                }
                if (!missingForOthers) {
                    lvl60Recipes.push(recipe);
                }
                else {
                    impossibleRecipes.push(recipe);
                }
            }
        })

        // Update all of our variables for UI
        setColumn1Recipes(lvl0Recipes);
        setColumn2Recipes(lvl30Recipes);
        setColumn3Recipes(lvl60Recipes);
        setColumn4Recipes(impossibleRecipes);
        setColumn1Ingredients(possibleIngredients);
        setColumn2Ingredients(higherLvlIngredients);
        setColumn3Ingredients(otherMonIngredients);
        setColumn4Ingredients(impossibleIngredients);
    }, [weeklyRecipe, weeklyPokemon, ownedPokemon])

    return (
        <Row className="recipes-section">
            <RecipeOptions title="Possible Recipes"             recipes={column1Recipes} titleIngredients={column1Ingredients} 
                possible={RecipePossibility.Possible} />
            <RecipeOptions title="Recipes at Higher Levels"     recipes={column2Recipes} titleIngredients={column2Ingredients} />
            <RecipeOptions title="Recipes with more Pokémon"    recipes={column3Recipes} titleIngredients={column3Ingredients} />
            <RecipeOptions title="Impossible Recipes this Week" recipes={column4Recipes} titleIngredients={column4Ingredients}
                possible={RecipePossibility.Impossible}
            />
        </Row>
    )
}