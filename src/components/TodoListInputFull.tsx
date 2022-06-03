import React, { ChangeEvent, useState } from "react";

type TodoListInputPropsType = {
    addTask: (task: string) => void;
};

export const TodoListInputFull = (props: TodoListInputPropsType) => {
    let [inputValue, setInputValue] = useState("");

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    };
    const onClickButtonHandler = () => {
        props.addTask(inputValue);
        setInputValue("");
    };

    return (
        <div>
            <input value={inputValue} onChange={onChangeInputHandler} />
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};
