import { pokedex } from "../../../assets/resources";
import { Column } from "../../generic/Column";
import { Row } from "../../generic/Row";
import { PageSection } from "../../generic/PageSection";
import { formatIdForPng } from "../helpers.tsx";
// @ts-ignore
import "./PokemonList.less"
import { AppContext } from "../../../App.tsx";

export const PokemonList = (props: {context: AppContext}) => {

    const {ownedPokemon, togglePokemon} = props.context;

    return (
        <div className="pokemon-list">
            <PageSection>
                <Column>
                    {pokedex.map(mon => {
                        
                        var monState = ownedPokemon.find(oP => oP.id == mon.id)

                        return (
                            <Row key={mon.id + "_Pokemon"}>
                                <button onClick={() => togglePokemon(mon)}>{monState?.Perf + ""}</button>
                                <img src={formatIdForPng(mon.id)} />
                                <p>{mon.name}</p>
                                <button>
                                    <p>{mon.ingredient_1}</p>
                                </button>
                                <button>
                                    <p>{mon.ingredient_2}</p>
                                </button>
                                <button>
                                    <p>{mon.ingredient_3}</p>
                                </button>
                            </Row>
                        )
                    })}
                </Column>
            </PageSection>
        </div>
    )
}