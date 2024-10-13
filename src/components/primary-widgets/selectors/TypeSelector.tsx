import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { berryTypes, BoxEntry, IngredientLevel, ingredients, pokedex, Pokemon, TypeGroup, typeGroups } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import { formatIdForPng } from "../helpers";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { Pill } from "../../generic/Pill";
import { HoverHighlight } from "../../generic/HoverHighlight";

export const TypeSelector = (props: {pokemon: Pokemon[], setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext, excludeLevel60: boolean}) => {

    const {setPokemon, context, excludeLevel60} = props;
    const [titleImg, setTitleImg] = useState("");
    const [title, setTitle] = useState("Select a Berry");
    const [activeTypeGroups, setActiveTypeGroups] = useState<TypeGroup[]>([]);

    useEffect(() => {
        var typeGroupSubsets = typeGroups.filter(g => g.berry == title);
        var pokemon = pokedex.filter(p => p.berry == title).filter(p => typeGroupSubsets.find(tGS => tGS.default == p.name) != undefined);
        setPokemon(pokemon);
        setActiveTypeGroups(typeGroupSubsets);
    }, [title])

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
        <Row className="type-selector">
            <Dropdown
                menuDisplay={
                    <Row>
                        {titleImg &&
                            <img className="img-xs" src={titleImg} />
                        }
                        <p>{title}</p>
                    </Row>
                }
                contents={
                    berryTypes.map(berryType => 
                        <div key={berryType.index + "_berry_type"} onClick={() => {setTitleImg(berryType.berryImageUri); setTitle(berryType.berryName);}}>
                            <Row>
                                <img className="img-xs" src={berryType.berryImageUri} />
                                <p className="flex-1">{berryType.berryName}</p>
                                <p className="flex-1">{berryType.typeName}</p>
                                <img className="img-xs" src={berryType.typeImageUri} />
                            </Row>
                        </div>
                    )
                }
            />
            <Row>
                {activeTypeGroups.map(tG => {
                    var dexEntry = pokedex.find(p => p.name == tG.default)!;
                    if (dexEntry == undefined) return null;

                    var monState = context.ownedPokemon.find(oP => oP.id == dexEntry.id);
                    return (
                        <Column
                            key={tG.key + "_berry_mon"} 
                            className={"pokemon-selector " + (monState?.Perf ? "can-use" : "cant-use")}
                        >
                            <div onClick={() => context.togglePokemon(dexEntry)}>
                                <div className="main-icon">
                                    <img
                                        src={dexEntry.portraitUri} 
                                        // src={formatIdForPng(p.id)} 
                                        className="img-m"
                                    />
                                    <Row className="sub-icon-group">
                                        {tG.pokemon.filter(subP => subP != dexEntry.name).map(subP => {
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
                                                context.selectPokemonIngredients(dexEntry, IngredientLevel.Lvl0); 
                                                event.stopPropagation();
                                            }}
                                        />
                                    </HoverHighlight>
                                    <HoverHighlight className="img-xs">
                                        <img 
                                            src={ingredients.find(i => i.name == dexEntry.ingredient_2)?.uri}
                                            className="img-xs"
                                            onClick={(event) => {
                                                context.selectPokemonIngredients(dexEntry, IngredientLevel.Lvl30); 
                                                event.stopPropagation();
                                            }}
                                        />
                                    </HoverHighlight>
                                    {dexEntry.ingredient_3 ?
                                        <HoverHighlight className="img-xs">
                                            <img 
                                                src={ingredients.find(i => i.name == dexEntry.ingredient_3)?.uri}
                                                className="img-xs"
                                                onClick={(event) => {
                                                    context.selectPokemonIngredients(dexEntry, IngredientLevel.Lvl60); 
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
                })}
            </Row>
        </Row>
    )
}