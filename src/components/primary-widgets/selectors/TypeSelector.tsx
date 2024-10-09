import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { berryTypes, ingredients, pokedex, Pokemon, TypeGroup, typeGroups } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import { formatIdForPng } from "../helpers";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";

export const TypeSelector = (props: {pokemon: Pokemon[], setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext}) => {

    const {setPokemon, context} = props;
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
        <div>
            <Dropdown
                menuDisplay={
                    <Row>
                        {titleImg &&
                            <img className="img-s" src={titleImg} />
                        }
                        <p>{title}</p>
                    </Row>
                }
                contents={
                    berryTypes.map(berryType => 
                        <div key={berryType.index + "_berry_type"} onClick={() => {setTitleImg(berryType.berryImageUri); setTitle(berryType.berryName);}}>
                            <Row>
                                <img className="img-s" src={berryType.berryImageUri} />
                                <p className="flex-1">{berryType.berryName}</p>
                                <p className="flex-1">{berryType.typeName}</p>
                                <img className="img-s" src={berryType.typeImageUri} />
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
                            className={monState?.Perf ? "can-use" : "cant-use"}
                        >
                            <div className="main-icon" onClick={() => context.togglePokemon(dexEntry)}>
                                <img
                                    src={dexEntry.portraitUri} 
                                    // src={formatIdForPng(p.id)} 
                                />
                                <Row>
                                    <img 
                                        src={ingredients.find(i => i.name == dexEntry.ingredient_1)?.uri}
                                        className="img-s"
                                    />
                                    <img 
                                        src={ingredients.find(i => i.name == dexEntry.ingredient_2)?.uri}
                                        className="img-s"
                                    />
                                    <img 
                                        src={ingredients.find(i => i.name == dexEntry.ingredient_3)?.uri}
                                        className="img-s"
                                    />
                                </Row>
                                <Row className="sub-icon-row">
                                    {tG.pokemon.filter(subP => subP != dexEntry.name).map(subP => {
                                        var subDexEntry = pokedex.find(p => p.name == subP)!;
                                        if (subDexEntry == undefined) return null;

                                        return (
                                            <img
                                                className="img-s"
                                                src={subDexEntry.portraitUri}
                                            />
                                        )
                                    })}
                                </Row>
                            </div>
                        </Column>
                    )
                })}
            </Row>
        </div>
    )
}