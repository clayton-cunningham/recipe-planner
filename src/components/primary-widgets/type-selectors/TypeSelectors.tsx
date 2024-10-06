import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TypeSelector } from "./TypeSelector";
import { Pokemon } from "../../../assets/resources";

export const TypeSelectors = (props: {setTotalPokemon: Dispatch<SetStateAction<Pokemon[]>>}) => {

    const {setTotalPokemon} = props;
    const [pokemon1, setPokemon1] = useState<Pokemon[]>([]);
    const [pokemon2, setPokemon2] = useState<Pokemon[]>([]);
    const [pokemon3, setPokemon3] = useState<Pokemon[]>([]);

    useEffect(() => {
        setTotalPokemon(pokemon1.concat(pokemon2.concat(pokemon3)))
    }, [pokemon1, pokemon2, pokemon3])

    return (
        <div>
            <TypeSelector pokemon={pokemon1} setPokemon={setPokemon1} />
            <TypeSelector pokemon={pokemon2} setPokemon={setPokemon2} />
            <TypeSelector pokemon={pokemon3} setPokemon={setPokemon3} />
        </div>
    )
}