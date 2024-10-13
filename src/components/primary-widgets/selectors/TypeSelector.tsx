import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { berryTypes, IngredientLevel, pokedex, Pokemon, TypeGroup, typeGroups } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import { formatIdForPng } from "../helpers";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { PokemonSelector } from "./PokemonSelector";

export const TypeSelector = (props: {setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext, excludeLevel60: boolean}) => {

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
                    return (
                        <PokemonSelector
                            context={context}
                            typeGroup={tG}
                            excludeLevel60={excludeLevel60}
                            mainAction={(dexEntry: Pokemon) => context.togglePokemon(dexEntry)}
                            ingredientAction={(dexEntry: Pokemon, ingredientLevel: IngredientLevel) => context.selectPokemonIngredients(dexEntry, ingredientLevel)}
                        />
                    )
                })}
            </Row>
        </Row>
    )
}