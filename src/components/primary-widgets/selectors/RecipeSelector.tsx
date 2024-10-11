import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";

export const RecipeSelector = (props: {setWeeklyRecipe: Dispatch<SetStateAction<string>>}) => {

    const {setWeeklyRecipe} = props;
    const [titleImg, setTitleImg] = useState("");
    const [title, setTitle] = useState("Select a Recipe Type");

    useEffect(() => {
        setWeeklyRecipe(title);
    }, [title])

    return (
        <div>
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
                    [
                        <div key={"curry-selector"} onClick={() => {setTitleImg(""); setTitle("Curry");}}>
                            <Row>
                                <p className="flex-1">Curry</p>
                                {/* <img className="img-xs" src={} /> */}
                            </Row>
                        </div>,
                        <div key={"salad-selector"} onClick={() => {setTitleImg(""); setTitle("Salad");}}>
                            <Row>
                                <p className="flex-1">Salad</p>
                                {/* <img className="img-xs" src={} /> */}
                            </Row>
                        </div>,
                        <div key={"dessert-selector"} onClick={() => {setTitleImg(""); setTitle("Dessert");}}>
                            <Row>
                                <p className="flex-1">Dessert</p>
                                {/* <img className="img-xs" src={} /> */}
                            </Row>
                        </div>,
                    ]
                }
            />
        </div>
    )
}