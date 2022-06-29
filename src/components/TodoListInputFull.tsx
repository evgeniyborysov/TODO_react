import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type TodoListInputPropsType = {
    callBack: (inputValue: string) => void;
};

export const TodoListInputFull: React.FC<TodoListInputPropsType> = ({
    callBack,
}) => {
    let [inputValue, setInputValue] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTitle = (inputValue: string) => {
        const title = inputValue.trim();
        if (title !== "") {
            callBack(title);
            setInputValue("");
        } else {
            setError("Title is required!");
        }
    };

    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            setInputValue(event.currentTarget.value);
            addTitle(inputValue);
        }
    };

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    };
    const onClickButtonHandler = () => {
        addTitle(inputValue);
        setInputValue("");
    };

    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={inputValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
