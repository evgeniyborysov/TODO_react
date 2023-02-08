import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { TaskStatuses } from "../API/todolist-api";
import { EditableSpan } from "./EditableSpan";

type TaskPropsType = {
	title: string;
	taskID: string;
	todoListID: string;
	status: TaskStatuses;
	editTaskTitle: (todolistsID: string, taskID: string, title: string) => void;
	changeTaskStatus: (
		id: string,
		status: TaskStatuses,
		todolistsID: string
	) => void;
	removeTask: (id: string, todolistsID: string) => void;
};

export const Task = React.memo((props: TaskPropsType) => {
	const onClickRemoveTaskHandler = (id: string, todolistsID: string) => {
		props.removeTask(id, todolistsID);
	};

	const onClickChangeTaskStatusHandler = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		let newIsDoneValue = e.currentTarget.checked;
		props.changeTaskStatus(
			props.taskID,
			newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
			props.todoListID
		);
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
				checked={props.status === TaskStatuses.Completed}
				onChange={onClickChangeTaskStatusHandler}
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
