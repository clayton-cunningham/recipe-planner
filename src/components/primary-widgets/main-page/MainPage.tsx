import { useState } from "react";
import { PageSection } from "../../generic/PageSection";
import { RecipeOptions } from "../recipe-options/RecipeOptions";
import { TypeSelectors } from "../type-selectors/TypeSelectors";
import { Pokemon } from "../../../assets/resources";
import { AppContext } from "../../../App";

export const MainPage = (props: {context: AppContext}) => {

    const {context} = props;
    const [weeklyPokemon, setWeeklyPokemon] = useState<Pokemon[]>([]);

    return (
        <div>
            <PageSection>
                <TypeSelectors 
                    setWeeklyPokemon={setWeeklyPokemon}
                    context={context}
                />
                <RecipeOptions pokemon={weeklyPokemon.filter(tP => context.ownedPokemon.find(oP => oP.id == tP.id) != undefined)} />
            </PageSection>
        </div>
    )
}