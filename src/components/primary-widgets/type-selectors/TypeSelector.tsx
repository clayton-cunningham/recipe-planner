import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { berryTypes, pokedex, Pokemon } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import { formatIdForPng } from "../helpers";
import { AppContext } from "../../../App";
import "./TypeSelector.less"

export const TypeSelector = (props: {pokemon: Pokemon[], setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext}) => {

    const {pokemon, setPokemon, context} = props;
    const [title, setTitle] = useState("");

    useEffect(() => {
        var pokemon = pokedex.filter(p => p.berry == title);
        setPokemon(pokemon);
    }, [title])

    return (
        <div>
            <Dropdown
                title={title}
                contents={
                    berryTypes.map(berryType => 
                        <div key={berryType.index + "_berry_type"} onClick={() => setTitle(berryType.berryName)}>
                            <Row>
                                <p>{berryType.berryName}</p>
                                <p>{berryType.typeName}</p>
                            </Row>
                        </div>
                    )
                }
            />
            <Row>
                {pokemon.map(p => {
                    var monState = context.ownedPokemon.find(oP => oP.id == p.id);
                    return (
                        <img
                            key={p.id + "_berry_mon"} 
                            src={formatIdForPng(p.id)} 
                            onClick={() => context.togglePokemon(p)}
                            className={monState?.Perf ? "can-use" : "cant-use"}
                        />
                    )
                })}
            </Row>
        </div>
    )
}