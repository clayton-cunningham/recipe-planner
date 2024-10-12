import { useEffect, useState } from "react";
import { ingredients, Pokemon, Recipe, RecipePossibility, recipes } from "../../../assets/resources";
import "./Recipes.less";
import { RecipeOptions } from "./RecipeOptions"
import { Row } from "../../generic/Row";

export const Recipes = (props: {pokemon: Pokemon[], weeklyRecipe: string}) => {

    const {pokemon, weeklyRecipe} = props;
    const [lvl0Recipes, setLvl0Recipes] = useState<Recipe[]>([]);
    const [lvl30Recipes, setLvl30Recipes] = useState<Recipe[]>([]);
    const [lvl60Recipes, setLvl60Recipes] = useState<Recipe[]>([]);
    const [impossibleRecipes, setImpossibleRecipes] = useState<Recipe[]>([]);
    const [lvl0Ingredients, setLvl0Ingredients] = useState<string[]>([]);
    const [lvl30Ingredients, setLvl30Ingredients] = useState<string[]>([]);
    const [lvl60Ingredients, setLvl60Ingredients] = useState<string[]>([]);
    const [impossibleIngredients, setImpossibleIngredients] = useState<string[]>([]);

    useEffect(() => {
        var lvl0Ingredients = pokemon.map(p => p.ingredient_1);
        var lvl30Ingredients = pokemon.map(p => p.ingredient_2).filter(i => !lvl0Ingredients.includes(i));
        var lvl60Ingredients = pokemon.map(p => p.ingredient_3).filter(i => !lvl0Ingredients.includes(i)).filter(i => !lvl30Ingredients.includes(i));
        var impossibleIngredients = ingredients.map(i => i.name)
            .filter(i => 
                !pokemon.map(p => p.ingredient_1).includes(i) &&
                !pokemon.map(p => p.ingredient_2).includes(i) &&
                !pokemon.map(p => p.ingredient_3).includes(i)
            );
        var lvl0Recipes: Recipe[] = [];
        var lvl30Recipes: Recipe[] = [];
        var lvl60Recipes: Recipe[] = [];
        var impossibleRecipes: Recipe[] = [];

        recipes.filter(r => r.Type == weeklyRecipe).forEach(recipe => {
            var missingLvl0 = false;
            var missingLvl30 = false;
            var missingLvl60 = false;
            ingredients.forEach(ingredient => {
                var iCount = recipe[ingredient.name as keyof typeof recipe];

                if (iCount != undefined){
                    if (iCount != "0" && lvl0Ingredients.find(i => i == ingredient.name) == undefined) {
                        missingLvl0 = true;
                        if (iCount != "0" && lvl30Ingredients.find(i => i == ingredient.name) == undefined) {
                            missingLvl30 = true;
                            if (iCount != "0" && lvl60Ingredients.find(i => i == ingredient.name) == undefined) {
                                missingLvl60 = true;
                            }
                        }
                    }
                }
            })

            if (!missingLvl0) {
                lvl0Recipes.push(recipe);
            }
            else if (!missingLvl30) {
                lvl30Recipes.push(recipe);
            }
            else if (!missingLvl60) {
                lvl60Recipes.push(recipe);
            }
            else {
                impossibleRecipes.push(recipe);
            }
        })
        setLvl0Recipes(lvl0Recipes);
        setLvl30Recipes(lvl30Recipes);
        setLvl60Recipes(lvl60Recipes);
        setImpossibleRecipes(impossibleRecipes);
        setLvl0Ingredients(lvl0Ingredients);
        setLvl30Ingredients(lvl30Ingredients);
        setLvl60Ingredients(lvl60Ingredients);
        setImpossibleIngredients(impossibleIngredients);
    }, [pokemon])

    return (
        <Row className="recipes-section">
            <RecipeOptions title="Level 0 Recipes" recipes={lvl0Recipes} titleIngredients={lvl0Ingredients} possible={RecipePossibility.Possible} />
            <RecipeOptions title="Level 30 Recipes" recipes={lvl30Recipes} titleIngredients={lvl30Ingredients} />
            <RecipeOptions title="Level 60 Recipes" recipes={lvl60Recipes} titleIngredients={lvl60Ingredients} />
            <RecipeOptions 
                title="Impossible Recipes"
                recipes={impossibleRecipes} 
                titleIngredients={impossibleIngredients}
                possible={RecipePossibility.Impossible}
            />
        </Row>
    )
}