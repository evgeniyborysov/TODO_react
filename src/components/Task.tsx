import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";

export const Task = React.memo((props: any) => {
	const onClickRemoveTaskHandler = (id: string, todolistsID: string) => {
		props.removeTask(id, todolistsID);
	};

	const onClickChangeTaskStatusHandler = (
		id: string,
		isDone: boolean,
		todolistsID: string
	) => {
		props.changeTaskStatus(id, isDone, todolistsID);
	};

	const editTaskTitle = useCallback(
		(todolistsID: string, taskID: string, title: string) => {
			props.editTaskTitle(todolistsID, taskID, title);
		},
		[props.editTaskTitle, props.todoListID, props.taskID]
	);

	return (
		<li>
			<Checkbox
				checked={props.isDone}
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					onClickChangeTaskStatusHandler(
						props.taskID,
						event.currentTarget.checked,
						props.todoListID
					)
				}
			/>
			<EditableSpan
				title={props.title}
				onChange={(title) => {
					editTaskTitle(props.todoListID, props.taskID, title);
				}}
			/>

			<IconButton
				onClick={() => {
					onClickRemoveTaskHandler(props.taskID, props.todoListID);
				}}
			>
				<Delete />
			</IconButton>
		</li>
	);
});
