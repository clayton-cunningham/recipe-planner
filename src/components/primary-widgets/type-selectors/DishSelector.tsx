import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dropdown } from "../../generic/Dropdown";
import { Row } from "../../generic/Row";
import "./TypeSelector.less"

export const DishSelector = (props: {setWeeklyDish: Dispatch<SetStateAction<string>>}) => {

    const {setWeeklyDish} = props;
    const [titleImg, setTitleImg] = useState("");
    const [title, setTitle] = useState("Select a Dish Type");

    useEffect(() => {
        setWeeklyDish(title);
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
                    [
                        <div onClick={() => {setTitleImg(""); setTitle("Curry");}}>
                            <Row>
                                <p className="flex-1">Curry</p>
                                {/* <img className="img-s" src={} /> */}
                            </Row>
                        </div>,
                        <div onClick={() => {setTitleImg(""); setTitle("Salad");}}>
                            <Row>
                                <p className="flex-1">Salad</p>
                                {/* <img className="img-s" src={} /> */}
                            </Row>
                        </div>,
                        <div onClick={() => {setTitleImg(""); setTitle("Dessert");}}>
                            <Row>
                                <p className="flex-1">Dessert</p>
                                {/* <img className="img-s" src={} /> */}
                            </Row>
                        </div>,
                    ]
                }
            />
        </div>
    )
}