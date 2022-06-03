import React, { ChangeEvent } from "react";

type InputPropsType = {
    inputValue: string;
    setinputValue: (inputValue: string) => void;
};

export const Input = (props: InputPropsType) => {
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setinputValue(event.currentTarget.value);
    };

    return <input value={props.inputValue} onChange={onChangeInputHandler} />;
};
