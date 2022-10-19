import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
	title: string;
	onChange: (title: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
	console.log("EditableSpan called");
	let [editMode, setEditMode] = useState(false);
	let [title, setTitle] = useState("");

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(props.title);
	};
	const activateViewMode = () => {
		setEditMode(false);
		props.onChange(title);
	};
	const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setTitle(event.currentTarget.value);

	return editMode ? (
		<TextField
			id="outlined-basic"
			variant="outlined"
			size={"small"}
			value={title}
			onChange={onChangeTitleHandler}
			onBlur={activateViewMode}
		/>
	) : (
		<span onDoubleClick={activateEditMode}>{props.title}</span>
	);
});
