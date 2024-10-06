import { useEffect, useState } from "react";
import { ingredients, Pokemon, Recipe, recipes } from "../../../assets/resources";
import "./RecipeOptions.less";

export const RecipeOptions = (props: {pokemon: Pokemon[]}) => {

    const {pokemon} = props;
    const [lvl0Dishes, setLvl0Dishes] = useState<Recipe[]>([]);

    useEffect(() => {
        var lvl0Ingredients = pokemon.map(p => p.ingredient_1);
        var lvl0Dishes: Recipe[] = [];

        recipes.forEach(recipe => {
            var missingLvl0 = false;
            ingredients.forEach(ingredient => {
                var iCount = recipe[ingredient.name as keyof typeof recipe];

                if (iCount != "0" && lvl0Ingredients.find(lvl0I => lvl0I == ingredient.name) == undefined) {
                    missingLvl0 = true;
                }
            })

            if (!missingLvl0) {
                lvl0Dishes.push(recipe);
            }
        })
        setLvl0Dishes(lvl0Dishes);
    }, [pokemon])

    return (
        <div className="recipe-list">
            <h3>Dishes</h3>
            {lvl0Dishes.map(dish => 
                <div key={dish.key + "_dish"}>
                    <p>{dish.Dish}</p>
                </div>
            )}
        </div>
    )
}