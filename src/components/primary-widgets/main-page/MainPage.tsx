import { useState } from "react";
import { PageSection } from "../../generic/PageSection";
import { RecipeOptions } from "../recipe-options/RecipeOptions";
import { TypeSelectors } from "../type-selectors/TypeSelectors";
import { Pokemon } from "../../../assets/resources";

export const MainPage = () => {

    const [totalPokemon, setTotalPokemon] = useState<Pokemon[]>([]);

    return (
        <div>
            <PageSection>
                <TypeSelectors setTotalPokemon={setTotalPokemon} />
                <RecipeOptions pokemon={totalPokemon} />
            </PageSection>
        </div>
    )
}