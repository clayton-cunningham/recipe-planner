import { useState } from "react";
import { berryTypes } from "../../../assets/resources";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";

export const TypeSelector = () => {

    const [title, setTitle] = useState("");

    return (
        <div>
            <Dropdown
                title={title}
                contents={
                    berryTypes.map(berryType => 
                        <div id={berryType.index + "_berry_type"} onClick={() => setTitle(berryType.berryName)}>
                            <Row>
                                <p>{berryType.berryName}</p>
                                <p>{berryType.typeName}</p>
                            </Row>
                        </div>
                    )
                }
            />
        </div>
    )
}