import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { berryTypes, ingredients, pokedex, Pokemon, typeDivergentPokedex } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import { formatIdForPng } from "../helpers";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";

export const TypeSelector = (props: {pokemon: Pokemon[], setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext}) => {

    const {pokemon, setPokemon, context} = props;
    const [titleImg, setTitleImg] = useState("");
    const [title, setTitle] = useState("Select a Berry");

    useEffect(() => {
        var pokemon = pokedex.filter(p => p.berry == title).filter(p => typeDivergentPokedex.find(tDP => tDP == p.name) != undefined);
        setPokemon(pokemon);
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
                {pokemon.map(p => {
                    var monState = context.ownedPokemon.find(oP => oP.id == p.id);
                    return (
                        <Column
                            key={p.id + "_berry_mon"} 
                            className={monState?.Perf ? "can-use" : "cant-use"}
                        >
                            <div onClick={() => context.togglePokemon(p)}>
                                <img
                                    src={p.portraitUri} 
                                    // src={formatIdForPng(p.id)} 
                                />
                                <Row>
                                    <img 
                                        src={ingredients.find(i => i.name == p.ingredient_1)?.uri}
                                        className="img-s"
                                    />
                                    <img 
                                        src={ingredients.find(i => i.name == p.ingredient_2)?.uri}
                                        className="img-s"
                                    />
                                    <img 
                                        src={ingredients.find(i => i.name == p.ingredient_3)?.uri}
                                        className="img-s"
                                    />
                                </Row>
                            </div>
                        </Column>
                    )
                })}
            </Row>
        </div>
    )
}