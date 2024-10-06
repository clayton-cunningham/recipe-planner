import { Column } from "./Column";
// @ts-ignore
import React, { useState } from "react";

export const Dropdown = (props: {menuDisplay: any, contents: any[]}) => {

    const { menuDisplay, contents } = props;
    const [visible, setVisible] = useState(false);

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setVisible(false);
        }
    };

    return (
        <div>
            <button 
                className="dropdown"
                onClick={() => setVisible(!visible)}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
                {menuDisplay}
                {visible && (
                    <Column>
                        {contents}
                    </Column>
                )}
            </button>
        </div>
    )
}