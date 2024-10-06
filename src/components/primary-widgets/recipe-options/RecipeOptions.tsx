import { useEffect, useState } from "react";
import { ingredients, Pokemon, Recipe, recipes } from "../../../assets/resources";
import "./RecipeOptions.less";
import { Row } from "../../generic/Row";
import { Column } from "../../generic/Column";

export const RecipeOptions = (props: {pokemon: Pokemon[], weeklyDish: string}) => {

    const {pokemon, weeklyDish} = props;
    const [lvl0Dishes, setLvl0Dishes] = useState<Recipe[]>([]);

    useEffect(() => {
        var lvl0Ingredients = pokemon.map(p => p.ingredient_1);
        var lvl0Dishes: Recipe[] = [];

        recipes.filter(r => r.Type == weeklyDish).forEach(recipe => {
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

    const getIngredients = (recipe: Recipe) => {

        var currIngredients: any[] = [];
        ingredients.forEach(ingredient => {
            var iCount = recipe[ingredient.name as keyof typeof recipe];

            if (iCount != "0") {
                currIngredients.push(
                    <Row>
                        <p>{iCount}</p>
                        <img className="img-m" src={ingredient.uri} />
                    </Row>
                );
            }
        })

        return currIngredients;
    }

    return (
        <div className="recipe-list">
            <h3>Level 0 Dishes</h3>
            <Row>
                {ingredients.filter(i => pokemon.map(p => p.ingredient_1).find(pI => pI == i.name)).map(i =>
                    <img className="img-m" src={i.uri} />
                )}
            </Row>
            <Row>
                <Column>
                    {lvl0Dishes.map(dish => 
                        <Row key={dish.key + "_dish"} className="recipe-entry">
                            <div className="flex-1">
                                <img src={"./dishes/" + dish.Dish.toLowerCase().split(" ").join("") + ".png"} />
                            </div>
                            <p className="flex-2">{dish.Dish}</p>
                            <Row className="flex-2 ingredient-list">
                                {getIngredients(dish)}
                            </Row>
                        </Row>
                    )}
                </Column>
                {/* <Column>
                    {lvl0Dishes.map(dish => 
                        <Row key={dish.key + "_dish"}>
                            {getIngredients(dish)}
                        </Row>
                    )}
                </Column> */}
            </Row>
        </div>
    )
}