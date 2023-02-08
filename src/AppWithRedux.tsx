import React, { useCallback } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { TodoListInputFull } from "./components/TodoListInputFull";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {
	RemoveTodoListAC,
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	FilterValueType,
	TodolistDomainType,
} from "./state/todoLists-reducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	TasksType,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskStatuses } from "./API/todolist-api";

function AppWithReducers() {
	const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
		(state) => state.todolist
	);
	const tasks = useSelector<AppRootStateType, TasksType>(
		(state) => state.tasks
	);
	const dispatch = useDispatch();

	const addTodoList = useCallback(
		(title: string) => {
			const action = AddTodoListAC(title);
			dispatch(action);
		},
		[dispatch]
	);

	const addTODO = useCallback(
		(title: string, todoListID: string) => {
			const action = AddTaskAC(todoListID, title);
			dispatch(action);
		},
		[dispatch]
	);

	const removeTodoList = useCallback(
		(todoListID: string) => {
			const action = RemoveTodoListAC(todoListID);
			dispatch(action);
		},
		[dispatch]
	);

	const changeTaskStatus = useCallback(
		(taskID: string, status: TaskStatuses, todolistsID: string) => {
			const action = ChangeTaskStatusAC(todolistsID, taskID, status);
			dispatch(action);
		},
		[dispatch]
	);

	const filterTasks = useCallback(
		(filetValue: FilterValueType, todolistsID: string) => {
			const action = ChangeTodoListFilterAC(todolistsID, filetValue);
			dispatch(action);
		},
		[dispatch]
	);

	const removeTask = useCallback(
		(taskID: string, todolistsID: string) => {
			const action = RemoveTaskAC(todolistsID, taskID);
			dispatch(action);
		},
		[dispatch]
	);

	const editTaskTitle = useCallback(
		(todolistsID: string, taskID: string, title: string) => {
			const action = ChangeTaskTitleAC(todolistsID, taskID, title);
			dispatch(action);
		},
		[dispatch]
	);

	const editTodoListTitle = useCallback(
		(todolistsID: string, title: string) => {
			const action = ChangeTodoListTitleAC(todolistsID, title);
			dispatch(action);
		},
		[dispatch]
	);

	return (
		<div className="App">
			<ButtonAppBar />
			<Container fixed>
				<Grid container style={{ padding: "10px" }}>
					<TodoListInputFull callBack={addTodoList} name={"Add"} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map((td) => {
						let filteredTasks = tasks[td.id];
						return (
							<Grid key={td.id} item>
								<Paper style={{ padding: "10px" }}>
									<TodoList
										// key={td.id}
										todoListID={td.id}
										filter={td.filter}
										title={td.title}
										tasks={filteredTasks}
										removeTask={removeTask}
										filterTasks={filterTasks}
										addTODO={addTODO}
										changeTaskStatus={changeTaskStatus}
										removeTodoList={removeTodoList}
										editTaskTitle={editTaskTitle}
										editTodoListTitle={editTodoListTitle}
									/>
								</Paper>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default AppWithReducers;
