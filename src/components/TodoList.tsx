import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import React, { useCallback } from "react";
import { TaskStatuses, TaskType } from "../API/todolist-api";
import { FilterValueType } from "../state/todoLists-reducer";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
import { TodoListInputFull } from "./TodoListInputFull";

type TodoListPropsType = {
	todoListID: string;
	filter: FilterValueType;
	title: string;
	tasks: Array<TaskType>;
	removeTask: (taskID: string, todolistsID: string) => void;
	filterTasks: (filetValue: FilterValueType, todoListID: string) => void;
	addTODO: (title: string, todoListID: string) => void;
	changeTaskStatus: (
		taskID: string,
		status: TaskStatuses,
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
		taskForTodoList = taskForTodoList.filter(
			(task) => task.status === TaskStatuses.New
		);
	}
	if (props.filter === "Completed") {
		taskForTodoList = taskForTodoList.filter(
			(task) => task.status === TaskStatuses.Completed
		);
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

			<TodoListInputFull callBack={addTODO} name={"Add task"} />
			<ul>
				{taskForTodoList.map((task) => {
					return (
						<Task
							key={task.id}
							title={task.title}
							taskID={task.id}
							status={task.status}
							todoListID={props.todoListID}
							editTaskTitle={props.editTaskTitle}
							changeTaskStatus={props.changeTaskStatus}
							removeTask={props.removeTask}
						/>
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
