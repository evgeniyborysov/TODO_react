import React, { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
    todoListID: string;
    className: string;
    inputValue: string;
    setInputValue: (inputValue: string) => void;
    addTODO: () => void;
    setError: (error: string | null) => void;
};

export const Input = (props: InputPropsType) => {
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value);
    };
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (event.key === "Enter") {
            props.setInputValue(event.currentTarget.value);
            props.addTODO();
        }
    };

    return (
        <input
            className={props.className}
            value={props.inputValue}
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressInputHandler}
        />
    );
};
