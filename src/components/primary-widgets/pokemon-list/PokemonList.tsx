import { pokedex } from "../../../assets/resources";
import { Column } from "../../generic/Column";
import { Row } from "../../generic/Row";
import { PageSection } from "../../generic/PageSection";
import { formatIdForPng } from "../helpers.tsx";
// @ts-ignore
import "./PokemonList.less"

export const PokemonList = () => {

    return (
        <div className="pokemon-list">
            <PageSection>
                <Column>
                    {pokedex.map(mon => {
                        return (
                            <Row key={mon.id + "_Pokemon"}>
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