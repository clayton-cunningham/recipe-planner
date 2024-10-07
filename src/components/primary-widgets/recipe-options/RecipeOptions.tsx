import { ingredients, Recipe } from "../../../assets/resources";
import "./RecipeOptions.less";
import { Row } from "../../generic/Row";
import { Column } from "../../generic/Column";

export const RecipeOptions = (props: {dishes: Recipe[], title: string, titleIngredients: string[]}) => {

    const {title, dishes, titleIngredients} = props;


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
                    {dishes.map(dish => 
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