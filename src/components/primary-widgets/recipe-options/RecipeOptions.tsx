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
            <h3>{title}</h3>
            <Row>
                {ingredients.filter(i => titleIngredients.find(pI => pI == i.name)).map(i =>
                    <img className="img-m" src={i.uri} />
                )}
            </Row>
            <Row> 
                <Column>
                    {recipes.map(recipe => 
                        <Row key={recipe.key + "_recipe"} className="recipe-entry">
                            <div className="flex-1">
                                <img src={"./recipes/" + recipe.Recipe.toLowerCase().split(" ").join("") + ".png"} />
                            </div>
                            <p className="flex-2">{recipe.Recipe}</p>
                            <Row className="flex-2 ingredient-list">
                                {getIngredients(recipe)}
                            </Row>
                        </Row>
                    )}
                </Column>
                {/* <Column>
                    {lvl0Recipes.map(recipe => 
                        <Row key={recipe.key + "_recipe"}>
                            {getIngredients(recipe)}
                        </Row>
                    )} 
                </Column> */}
            </Row>
        </div>
    )
}