import { pokedex } from "../../../assets/resources";
import { Column } from "../../generic/Column";
import { Row } from "../../generic/Row";
import { PageSection } from "../../generic/PageSection";
import { formatIdForPng } from "../helpers.tsx";
// @ts-ignore
import "./PokemonList.less"
import { AppContext } from "../../../App.tsx";

export const PokemonList = (props: {context: AppContext}) => {

    const {selectedPokemon, togglePokemon} = props.context;

    return (
        <div className="pokemon-list">
            <PageSection>
                <Column>
                    {pokedex.map(mon => {
                        
                        var monState = selectedPokemon.find(oP => oP.id == mon.id)

                        return (
                            <div key={mon.id + "_Pokemon"} onClick={() => togglePokemon(mon)}>
                                <Row>
                                    <input type="checkbox" checked={monState?.Perf} onChange={() => {}} />
                                    {/* <input type="checkbox" onChange={() => togglePokemon(mon)} checked={monState?.Perf} /> */}
                                    {/* <button onClick={() => togglePokemon(mon)}>{monState?.Perf + ""}</button> */}
                                    <img src={mon.portraitUri} />
                                    {/* <img src={formatIdForPng(mon.id)} /> */}
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
                            </div>
                        )
                    })}
                </Column>
            </PageSection>
        </div>
    )
}