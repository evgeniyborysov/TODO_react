import { TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type TodoListInputPropsType = {
	callBack: (inputValue: string) => void;
};

export const TodoListInputFull: React.FC<TodoListInputPropsType> = React.memo(
	({ callBack }) => {
		let [inputValue, setInputValue] = useState("");
		let [error, setError] = useState<string | null>(null);

		console.log("Input");

		const addTitle = (inputValue: string) => {
			const title = inputValue.trim();
			if (title !== "") {
				callBack(title);
				setInputValue("");
			} else {
				setError("Title is required!");
			}
		};

		const onKeyPressInputHandler = (
			event: KeyboardEvent<HTMLInputElement>
		) => {
			if (event.key === "Enter") {
				setInputValue(event.currentTarget.value);
				addTitle(inputValue);
			}

			if (error !== null) {
				setError(null);
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
				{/* <input
                className={error ? "error" : ""}
                value={inputValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
            /> */}
				{/* <button onClick={onClickButtonHandler}>+</button> */}
				<TextField
					error={!!error}
					id="outlined-basic"
					label={!!error ? "Title is required!" : "Add task"}
					variant="outlined"
					size={"small"}
					value={inputValue}
					onChange={onChangeInputHandler}
					onKeyPress={onKeyPressInputHandler}
				/>
				<Button
					style={{
						maxWidth: "40px",
						maxHeight: "40px",
						minWidth: "40px",
						minHeight: "40px",
					}}
					variant="contained"
					color="secondary"
					onClick={onClickButtonHandler}
				>
					+
				</Button>
			</div>
		);
	}
);
