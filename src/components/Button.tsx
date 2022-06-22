import React from "react";

type ButtonPropsType = {
    className?: string;
    name: string;
    callBack: () => void;
};

export const Button = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.callBack();
    };

    return (
        <button
            className={props.className}
            onClick={() => {
                onClickButtonHandler();
            }}
        >
            {props.name}
        </button>
    );
};
