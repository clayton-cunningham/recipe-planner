import { useEffect, useState } from "react";
import { ingredients, Pokemon, Recipe, recipes } from "../../../assets/resources";
import "./RecipeOptions.less";
import { Row } from "../../generic/Row";
import { Column } from "../../generic/Column";
import { RecipeOptions } from "./RecipeOptions"

export const Recipes = (props: {pokemon: Pokemon[], weeklyDish: string}) => {

    const {pokemon, weeklyDish} = props;
    const [lvl0Dishes, setLvl0Dishes] = useState<Recipe[]>([]);
    const [lvl30Dishes, setLvl30Dishes] = useState<Recipe[]>([]);
    const [lvl60Dishes, setLvl60Dishes] = useState<Recipe[]>([]);
    const [impossibleDishes, setImpossibleDishes] = useState<Recipe[]>([]);

    useEffect(() => {
        var lvl0Ingredients = pokemon.map(p => p.ingredient_1);
        var lvl30Ingredients = pokemon.map(p => p.ingredient_2);
        var lvl60Ingredients = pokemon.map(p => p.ingredient_3);
        var lvl0Dishes: Recipe[] = [];
        var lvl30Dishes: Recipe[] = [];
        var lvl60Dishes: Recipe[] = [];
        var impossibleDishes: Recipe[] = [];

        recipes.filter(r => r.Type == weeklyDish).forEach(recipe => {
            var missingLvl0 = false;
            var missingLvl30 = false;
            var missingLvl60 = false;
            ingredients.forEach(ingredient => {
                var iCount = recipe[ingredient.name as keyof typeof recipe];

                if (iCount != undefined){
                    // TODO: we likely can make this faster
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
                lvl0Dishes.push(recipe);
            }
            else if (!missingLvl30) {
                lvl30Dishes.push(recipe);
            }
            else if (!missingLvl60) {
                lvl60Dishes.push(recipe);
            }
            else {
                impossibleDishes.push(recipe);
            }
        })
        setLvl0Dishes(lvl0Dishes);
        setLvl30Dishes(lvl30Dishes);
        setLvl60Dishes(lvl60Dishes);
        setImpossibleDishes(impossibleDishes);
    }, [pokemon])

    // const getIngredients = (recipe: Recipe) => {

    //     var currIngredients: any[] = [];
    //     ingredients.forEach(ingredient => {
    //         var iCount = recipe[ingredient.name as keyof typeof recipe];

    //         if (iCount != "0") {
    //             currIngredients.push(
    //                 <Row>
    //                     <p>{iCount}</p>
    //                     <img className="img-m" src={ingredient.uri} />
    //                 </Row>
    //             );
    //         }
    //     })

    //     return currIngredients;
    // }

    return (
        <div>
            <RecipeOptions title="Level 0 Dishes" dishes={lvl0Dishes} titleIngredients={pokemon.map(p => p.ingredient_1)} />
            <RecipeOptions title="Level 30 Dishes" dishes={lvl30Dishes} titleIngredients={pokemon.map(p => p.ingredient_2)} />
            <RecipeOptions title="Level 60 Dishes" dishes={lvl60Dishes} titleIngredients={pokemon.map(p => p.ingredient_3)} />
            <RecipeOptions 
                title="Impossible Dishes" 
                dishes={impossibleDishes} 
                titleIngredients={ingredients.map(i => i.name)
                    .filter(i => 
                        !pokemon.map(p => p.ingredient_1).includes(i) &&
                        !pokemon.map(p => p.ingredient_2).includes(i) &&
                        !pokemon.map(p => p.ingredient_3).includes(i)
                    )} />
        </div>
        // <div className="recipe-list">
        //     <h3>Level 0 Dishes</h3>
        //     <Row>
        //         {ingredients.filter(i => pokemon.map(p => p.ingredient_1).find(pI => pI == i.name)).map(i =>
        //             <img className="img-m" src={i.uri} />
        //         )}
        //     </Row>
        //     <Row>
        //         <Column>
        //             {lvl0Dishes.map(dish => 
        //                 <Row key={dish.key + "_dish"} className="recipe-entry">
        //                     <div className="flex-1">
        //                         <img src={"./dishes/" + dish.Dish.toLowerCase().split(" ").join("") + ".png"} />
        //                     </div>
        //                     <p className="flex-2">{dish.Dish}</p>
        //                     <Row className="flex-2 ingredient-list">
        //                         {getIngredients(dish)}
        //                     </Row>
        //                 </Row>
        //             )}
        //         </Column>
        //         {/* <Column>
        //             {lvl0Dishes.map(dish => 
        //                 <Row key={dish.key + "_dish"}>
        //                     {getIngredients(dish)}
        //                 </Row>
        //             )}
        //         </Column> */}
        //     </Row>
        // </div>
    )
}