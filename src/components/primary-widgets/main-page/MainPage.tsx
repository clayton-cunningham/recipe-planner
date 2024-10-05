import { berryTypes } from "../../../assets/resources";
import { Column } from "../../generic/Column";
import { Dropdown } from "../../generic/Dropdown";
import { PageSection } from "../../generic/PageSection";
// @ts-ignore
import React from "react";
import { Row } from "../../generic/Row";

export const MainPage = () => {

    console.log(berryTypes);
    return (
        <div>
            <PageSection>
                <Dropdown
                    title=""
                    contents={
                        berryTypes.map(berryType => 
                            <div id={berryType.index}>
                                <Row>
                                    <p>{berryType.berryName}</p>
                                    <p>{berryType.typeName}</p>
                                </Row>
                            </div>
                        )
                    }
                />
            </PageSection>
        </div>
    )
}