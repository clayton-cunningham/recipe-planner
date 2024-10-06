import { useState } from "react";
import { PageSection } from "../../generic/PageSection";
import { RecipeOptions } from "../recipe-options/RecipeOptions";
import { DishSelector } from "../type-selectors/DishSelector";
import { TypeSelectors } from "../type-selectors/TypeSelectors";
import { Pokemon } from "../../../assets/resources";
import { AppContext } from "../../../App";

export const MainPage = (props: {context: AppContext}) => {

    const {context} = props;
    const [weeklyPokemon, setWeeklyPokemon] = useState<Pokemon[]>([]);
    const [weeklyDish, setWeeklyDish] = useState<string>("");

    return (
        <div>
            <PageSection>
                <DishSelector setWeeklyDish={setWeeklyDish} />
                <TypeSelectors 
                    setWeeklyPokemon={setWeeklyPokemon}
                    context={context}
                />
                <RecipeOptions 
                    pokemon={weeklyPokemon.filter(tP => context.ownedPokemon.find(oP => oP.id == tP.id && oP.Perf) != undefined)}
                    weeklyDish={weeklyDish}
                />
            </PageSection>
        </div>
    )
}