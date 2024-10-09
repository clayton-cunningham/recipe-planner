import { ingredients, Recipe } from "../../../assets/resources";
import "./Recipes.less";
import { Row } from "../../generic/Row";
import { Column } from "../../generic/Column";

export const RecipeOptions = (props: {recipes: Recipe[], title: string, titleIngredients: string[]}) => {

    const {title, recipes, titleIngredients} = props;


    const getIngredients = (recipe: Recipe) => {

        var currIngredients: any[] = [];
        ingredients.forEach(ingredient => {
            var iCount = recipe[ingredient.name as keyof typeof recipe];

            if (iCount != undefined && iCount != "0") {
                currIngredients.push(
                    <Row key={ingredient.name + "_ingredient-count"}>
                        <p className="ingredient-count">{iCount}</p>
                        <img className="img-m" src={ingredient.uri} />
                    </Row>
                );
            }
        })

        return currIngredients;
    }
    
    return (
        <div className="recipe-list">
            <h3>{title}</h3>
            <Row>
                {ingredients.filter(i => titleIngredients.find(pI => pI == i.name)).map(i =>
                    <img key={i.name + "_ingredient-obtainable"} className="img-m" src={i.uri} />
                )}
            </Row>
            <Column>
                {recipes.map(recipe => 
                    <Row key={recipe.key + "_recipe-entry"} className={"recipe-entry"}>
                        <div>
                            <img src={"./recipes/" + recipe.Recipe.toLowerCase().split(" ").join("") + ".png"} />
                        </div>
                        <p className="recipe-name">{recipe.Recipe}</p>
                        <Row className="ingredient-list">
                            {getIngredients(recipe)}
                        </Row>
                    </Row>
                )}
            </Column>
            {/* {recipes.length > 0 &&
                (<Grid
                    cells={[
                        ...recipes.map(recipe => 
                            [
                                <div>
                                    <img src={"./recipes/" + recipe.Recipe.toLowerCase().split(" ").join("") + ".png"} />
                                </div>,
                                <p className="recipe-name">{recipe.Recipe}</p>,
                                <Row className="ingredient-list">
                                    {getIngredients(recipe)}
                                </Row>,
                            ]
                        ).reduce((acc, curr) => acc.concat(curr))
                    ]}
                />)
            } */}
        </div>
    )
}