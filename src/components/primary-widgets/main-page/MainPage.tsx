import { useState } from "react";
import { PageSection } from "../../generic/PageSection";
import { Recipes } from "../recipe-options/Recipes";
import { RecipeSelector } from "../selectors/RecipeSelector";
import { TypeSelectors } from "../selectors/TypeSelectors";
import { Pokemon } from "../../../assets/resources";
import { AppContext } from "../../../App";
import "./MainPage.less"
import { Column } from "../../generic/Column";

export const MainPage = (props: {context: AppContext}) => {

    const {context} = props;
    const [weeklyPokemon, setWeeklyPokemon] = useState<Pokemon[]>([]);
    const [weeklyRecipe, setWeeklyRecipe] = useState<string>("");

    return (
        <PageSection>
            <Column>
                <Column className="selectors">
                    <RecipeSelector setWeeklyRecipe={setWeeklyRecipe} />
                    <TypeSelectors 
                        setWeeklyPokemon={setWeeklyPokemon}
                        context={context}
                    />
                </Column>
                <Recipes 
                    weeklyPokemon={weeklyPokemon}
                    weeklyRecipe={weeklyRecipe}
                    ownedPokemon={context.ownedPokemon}
                />
            </Column>
        </PageSection>
    )
}