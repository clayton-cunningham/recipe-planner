import { useState } from "react";
import { PageSection } from "../../generic/PageSection";
import { Recipes } from "../recipe-options/Recipes";
import { RecipeSelector } from "../selectors/RecipeSelector";
import { TypeSelectors } from "../selectors/TypeSelectors";
import { Pokemon } from "../../../assets/resources";
import { AppContext } from "../../../App";

export const MainPage = (props: {context: AppContext}) => {

    const {context} = props;
    const [weeklyPokemon, setWeeklyPokemon] = useState<Pokemon[]>([]);
    const [weeklyRecipe, setWeeklyRecipe] = useState<string>("");

    return (
        <div>
            <PageSection>
                <RecipeSelector setWeeklyRecipe={setWeeklyRecipe} />
                <TypeSelectors 
                    setWeeklyPokemon={setWeeklyPokemon}
                    context={context}
                />
                <Recipes 
                    pokemon={weeklyPokemon.filter(tP => context.ownedPokemon.find(oP => oP.id == tP.id && oP.Perf) != undefined)}
                    weeklyRecipe={weeklyRecipe}
                />
            </PageSection>
        </div>
    )
}