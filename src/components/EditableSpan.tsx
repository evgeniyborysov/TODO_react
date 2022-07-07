import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string;
    onChange: (title: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
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
        // <input
        //     autoFocus
        //     onChange={onChangeTitleHandler}
        //     onBlur={activateViewMode}
        //     value={title}
        // />
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
}
