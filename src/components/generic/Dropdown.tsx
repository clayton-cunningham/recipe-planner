import { Column } from "./Column";
// @ts-ignore
import React, { useState } from "react";

export const Dropdown = (props: {title: string, contents: any[]}) => {

    const { title, contents } = props;
    const [visible, setVisible] = useState(false);

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setVisible(false);
        }
    };

    return (
        <div className="dropdown">
            <button 
                onClick={() => setVisible(!visible)}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
                {title}
                {visible && (
                    <Column>
                        {contents}
                    </Column>
                )}
            </button>
        </div>
    )
}