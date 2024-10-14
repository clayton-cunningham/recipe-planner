import { BoxEntry, IngredientLevel, ingredients, pokedex, Pokemon, TypeGroup } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { Pill } from "../../generic/Pill";
import { HoverHighlight } from "../../generic/HoverHighlight";
import { CloseButton } from "../../generic/CloseButton";

export const PokemonSelector = (props: 
    {typeGroup: TypeGroup, context: AppContext, excludeLevel60: boolean, 
        mainAction: (source: Pokemon) => void, ingredientAction: (source: Pokemon, lvl: IngredientLevel) => void, closeAction?: () => any}) => {

    const {typeGroup, context, excludeLevel60, mainAction, ingredientAction, closeAction} = props;
    
    var dexEntry = pokedex.find(p => p.name == typeGroup.default)!;
    if (dexEntry == undefined) return null;

    var monState = context.selectedPokemon.find(oP => oP.id == dexEntry.id);

    const getIngredientPillState = (monState: BoxEntry | undefined) => {
        // We can have deactivated entries with filled in data, so we have to check both fields for 30 & 60.
        if (monState?.Perf && monState?.ingredientLevel == IngredientLevel.Lvl60) return "left-3";
        if (monState?.Perf && monState?.ingredientLevel == IngredientLevel.Lvl30) return "left-2";
        if (monState?.Perf) return "left-1";
        else return "left-0"
    }

    const getExludePillState = (excludeLevel60: boolean) => {
        if (excludeLevel60) return "right-1";
        else return "right-0"
    }

    return (
        <Column
            key={typeGroup.key + "_berry_mon"} 
            className={"pokemon-selector " + (monState?.Perf ? "can-use" : "cant-use")}
        >
            <div onClick={() => mainAction(dexEntry)}>
                <div className="main-icon">
                    <img
                        src={dexEntry.portraitUri} 
                        // src={formatIdForPng(p.id)} 
                        className="img-m"
                    />
                    <Row className="sub-icon-group">
                        {typeGroup.pokemon.filter(subP => subP != dexEntry.name).map(subP => {
                            var subDexEntry = pokedex.find(p => p.name == subP)!;
                            if (subDexEntry == undefined) return null;

                            return (
                                <img
                                    key={subDexEntry.id + "_sub-dex-entry"}
                                    className="img-xs"
                                    src={subDexEntry.portraitUri}
                                />
                            )
                        })}
                    </Row>
                    {closeAction &&
                        <CloseButton action={closeAction}/>
                    }
                </div>
                <Row className="pokemon-ingredients">
                    {dexEntry.ingredient_3 &&
                        <Pill className={"grey " + getExludePillState(excludeLevel60)} />
                    }
                    <Pill className={"green " + getIngredientPillState(monState)} />
                    <HoverHighlight className="img-xs">
                        <img 
                            src={ingredients.find(i => i.name == dexEntry.ingredient_1)?.uri}
                            className="img-xs"
                            onClick={(event) => {
                                ingredientAction(dexEntry, IngredientLevel.Lvl0); 
                                event.stopPropagation();
                            }}
                        />
                    </HoverHighlight>
                    <HoverHighlight className="img-xs">
                        <img 
                            src={ingredients.find(i => i.name == dexEntry.ingredient_2)?.uri}
                            className="img-xs"
                            onClick={(event) => {
                                ingredientAction(dexEntry, IngredientLevel.Lvl30); 
                                event.stopPropagation();
                            }}
                        />
                    </HoverHighlight>
                    {dexEntry.ingredient_3 ?
                        <HoverHighlight className="img-xs">
                            <img 
                                src={ingredients.find(i => i.name == dexEntry.ingredient_3)?.uri}
                                className={"img-xs" + (excludeLevel60 && (!monState?.Perf || monState?.ingredientLevel != IngredientLevel.Lvl60) ? " fade" : "")}
                                onClick={(event) => {
                                    ingredientAction(dexEntry, IngredientLevel.Lvl60);
                                    event.stopPropagation();
                                }}
                            />
                        </HoverHighlight>
                        :
                        <div className="img-xs"/>
                    }
                </Row>
            </div>
        </Column>
    )
}