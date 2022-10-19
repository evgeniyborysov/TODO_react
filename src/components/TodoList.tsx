import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import React, { useCallback } from "react";
import { FilterValueType } from "../App";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
import { TodoListInputFull } from "./TodoListInputFull";

export type TodoListTaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

type TodoListPropsType = {
	todoListID: string;
	filter: FilterValueType;
	title: string;
	tasks: Array<TodoListTaskType>;
	removeTask: (taskID: string, todolistsID: string) => void;
	filterTasks: (filetValue: FilterValueType, todoListID: string) => void;
	addTODO: (title: string, todoListID: string) => void;
	changeTaskStatus: (
		taskID: string,
		isDone: boolean,
		todolistsID: string
	) => void;
	removeTodoList: (todoListID: string) => void;
	editTaskTitle: (todolistsID: string, taskID: string, title: string) => void;
	editTodoListTitle: (todolistsID: string, title: string) => void;
};

export const TodoList = React.memo((props: TodoListPropsType) => {
	console.log("Todolist called");

	const onClickFilterButtonHandler = useCallback(
		(filterValue: FilterValueType, todoListID: string) => {
			props.filterTasks(filterValue, todoListID);
		},
		[props.filterTasks, props.todoListID]
	);

	// const onClickRemoveTaskHandler = (id: string, todolistsID: string) => {
	// 	props.removeTask(id, todolistsID);
	// };

	// const onClickChangeTaskStatusHandler = (
	// 	id: string,
	// 	isDone: boolean,
	// 	todolistsID: string
	// ) => {
	// 	props.changeTaskStatus(id, isDone, todolistsID);
	// };

	// const editTaskTitle = (
	// 	todolistsID: string,
	// 	taskID: string,
	// 	title: string
	// ) => {
	// 	props.editTaskTitle(todolistsID, taskID, title);
	// };

	const editTodoListTitle = useCallback(
		(todolistsID: string, title: string) => {
			props.editTodoListTitle(todolistsID, title);
		},
		[props.editTodoListTitle, props.todoListID]
	);

	// const editTodoListTitle = (todolistsID: string, title: string) => {
	// 	props.editTodoListTitle(todolistsID, title);
	// };

	const addTODO = useCallback(
		(task: string) => {
			props.addTODO(task, props.todoListID);
		},
		[props.todoListID, props.addTODO]
	);

	let taskForTodoList = props.tasks;

	if (props.filter === "Active") {
		taskForTodoList = taskForTodoList.filter((task) => !task.isDone);
	}
	if (props.filter === "Completed") {
		taskForTodoList = taskForTodoList.filter((task) => task.isDone);
	}

	return (
		<div>
			<div>
				<EditableSpan
					title={props.title}
					onChange={(title) => {
						editTodoListTitle(props.todoListID, title);
					}}
				/>
				<IconButton
					onClick={() => {
						props.removeTodoList(props.todoListID);
					}}
				>
					<Delete />
				</IconButton>
			</div>

			<TodoListInputFull callBack={addTODO} />
			<ul>
				{taskForTodoList.map((task) => {
					return (
						<Task
							key={task.id}
							title={task.title}
							taskID={task.id}
							todoListID={props.todoListID}
							editTaskTitle={props.editTaskTitle}
							changeTaskStatus={props.changeTaskStatus}
							removeTask={props.removeTask}
						/>
						// <li key={task.id}>
						// 	<Checkbox
						// 		// {...label}
						// 		checked={task.isDone}
						// 		onChange={(
						// 			event: ChangeEvent<HTMLInputElement>
						// 		) =>
						// 			onClickChangeTaskStatusHandler(
						// 				task.id,
						// 				event.currentTarget.checked,
						// 				props.todoListID
						// 			)
						// 		}
						// 	/>
						// 	<EditableSpan
						// 		title={task.title}
						// 		onChange={(title) => {
						// 			editTaskTitle(
						// 				props.todoListID,
						// 				task.id,
						// 				title
						// 			);
						// 		}}
						// 	/>

						// 	<IconButton
						// 		onClick={() => {
						// 			onClickRemoveTaskHandler(
						// 				task.id,
						// 				props.todoListID
						// 			);
						// 		}}
						// 	>
						// 		<Delete />
						// 	</IconButton>
						// </li>
					);
				})}
			</ul>
			<div>
				<Button
					variant={props.filter === "All" ? "contained" : "outlined"}
					color={"secondary"}
					size={"small"}
					onClick={() => {
						onClickFilterButtonHandler("All", props.todoListID);
					}}
				>
					All
				</Button>
				<Button
					variant={
						props.filter === "Active" ? "contained" : "outlined"
					}
					color={"success"}
					size={"small"}
					onClick={() => {
						onClickFilterButtonHandler("Active", props.todoListID);
					}}
				>
					Active
				</Button>
				<Button
					variant={
						props.filter === "Completed" ? "contained" : "outlined"
					}
					color={"error"}
					size={"small"}
					onClick={() => {
						onClickFilterButtonHandler(
							"Completed",
							props.todoListID
						);
					}}
				>
					Completed
				</Button>
			</div>
		</div>
	);
});

// export const TodoList = (props: TodoListPropsType) => {
// 	console.log("Todolist called");

// 	const onClickFilterButtonHandler = (
// 		filterValue: FilterValueType,
// 		todoListID: string
// 	) => {
// 		props.filterTasks(filterValue, todoListID);
// 	};

// 	const onClickRemoveTaskHandler = (id: string, todolistsID: string) => {
// 		props.removeTask(id, todolistsID);
// 	};

// 	const onClickChangeTaskStatusHandler = (
// 		id: string,
// 		isDone: boolean,
// 		todolistsID: string
// 	) => {
// 		props.changeTaskStatus(id, isDone, todolistsID);
// 	};

// 	const editTaskTitle = (
// 		todolistsID: string,
// 		taskID: string,
// 		title: string
// 	) => {
// 		props.editTaskTitle(todolistsID, taskID, title);
// 	};

// 	const editTodoListTitle = (todolistsID: string, title: string) => {
// 		props.editTodoListTitle(todolistsID, title);
// 	};

// 	const addTODO = useCallback((task: string) => {
// 		props.addTODO(task, props.todoListID);
// 	}, []);

// 	return (
// 		<div>
// 			<div>
// 				<EditableSpan
// 					title={props.title}
// 					onChange={(title) => {
// 						editTodoListTitle(props.todoListID, title);
// 					}}
// 				/>
// 				<IconButton
// 					onClick={() => {
// 						props.removeTodoList(props.todoListID);
// 					}}
// 				>
// 					<Delete />
// 				</IconButton>
// 			</div>

// 			<TodoListInputFull callBack={addTODO} />
// 			<ul>
// 				{props.tasks.map((task) => {
// 					return (
// 						<li key={task.id}>
// 							<Checkbox
// 								// {...label}
// 								checked={task.isDone}
// 								onChange={(
// 									event: ChangeEvent<HTMLInputElement>
// 								) =>
// 									onClickChangeTaskStatusHandler(
// 										task.id,
// 										event.currentTarget.checked,
// 										props.todoListID
// 									)
// 								}
// 							/>
// 							<EditableSpan
// 								title={task.title}
// 								onChange={(title) => {
// 									editTaskTitle(
// 										props.todoListID,
// 										task.id,
// 										title
// 									);
// 								}}
// 							/>

// 							<IconButton
// 								onClick={() => {
// 									onClickRemoveTaskHandler(
// 										task.id,
// 										props.todoListID
// 									);
// 								}}
// 							>
// 								<Delete />
// 							</IconButton>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 			<div>
// 				<Button
// 					variant={props.filter === "All" ? "contained" : "outlined"}
// 					color={"secondary"}
// 					size={"small"}
// 					onClick={() => {
// 						onClickFilterButtonHandler("All", props.todoListID);
// 					}}
// 				>
// 					All
// 				</Button>
// 				<Button
// 					variant={
// 						props.filter === "Active" ? "contained" : "outlined"
// 					}
// 					color={"success"}
// 					size={"small"}
// 					onClick={() => {
// 						onClickFilterButtonHandler("Active", props.todoListID);
// 					}}
// 				>
// 					Active
// 				</Button>
// 				<Button
// 					variant={
// 						props.filter === "Completed" ? "contained" : "outlined"
// 					}
// 					color={"error"}
// 					size={"small"}
// 					onClick={() => {
// 						onClickFilterButtonHandler(
// 							"Completed",
// 							props.todoListID
// 						);
// 					}}
// 				>
// 					Completed
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };
