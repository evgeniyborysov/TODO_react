import React, { useReducer, useCallback } from "react";
import "./App.css";
import { TodoList, TodoListTaskType } from "./components/TodoList";
import { v1 } from "uuid";
import { TodoListInputFull } from "./components/TodoListInputFull";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {
	RemoveTodoListAC,
	todoListsReducer,
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
} from "./state/todoLists-reducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	TasksReducer,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export type FilterValueType = "All" | "Active" | "Completed";

export type TodoListsType = {
	id: string;
	title: string;
	filter: FilterValueType;
};

export type TasksType = {
	[key: string]: Array<TodoListTaskType>;
};

function AppWithReducers() {
	const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(
		(state) => state.todolist
	);
	const tasks = useSelector<AppRootStateType, TasksType>(
		(state) => state.tasks
	);
	const dispatch = useDispatch();

	// function addTodoList(title: string) {
	// 	const action = AddTodoListAC(title);
	// 	dispatch(action);
	// }

	// const addTODO = (title: string, todoListID: string) => {
	// 	const action = AddTaskAC(todoListID, title);
	// 	dispatch(action);
	// };

	const addTodoList = useCallback((title: string) => {
		const action = AddTodoListAC(title);
		dispatch(action);
	}, []);

	const addTODO = useCallback((title: string, todoListID: string) => {
		const action = AddTaskAC(todoListID, title);
		dispatch(action);
	}, []);

	const removeTodoList = (todoListID: string) => {
		const action = RemoveTodoListAC(todoListID);
		dispatch(action);
	};

	const changeTaskStatus = (
		taskID: string,
		isDone: boolean,
		todolistsID: string
	) => {
		const action = ChangeTaskStatusAC(todolistsID, taskID, isDone);
		dispatch(action);
	};

	function filterTasks(filetValue: FilterValueType, todolistsID: string) {
		const action = ChangeTodoListFilterAC(todolistsID, filetValue);
		dispatch(action);
	}

	function removeTask(taskID: string, todolistsID: string) {
		const action = RemoveTaskAC(todolistsID, taskID);
		dispatch(action);
	}

	function editTaskTitle(todolistsID: string, taskID: string, title: string) {
		const action = ChangeTaskTitleAC(todolistsID, taskID, title);
		dispatch(action);
	}

	function editTodoListTitle(todolistsID: string, title: string) {
		const action = ChangeTodoListTitleAC(todolistsID, title);
		dispatch(action);
	}

	return (
		<div className="App">
			<ButtonAppBar />
			<Container fixed>
				<Grid container style={{ padding: "10px" }}>
					<TodoListInputFull callBack={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map((td) => {
						let filteredTasks = tasks[td.id];

						if (td.filter === "Active") {
							filteredTasks = filteredTasks.filter(
								(task) => !task.isDone
							);
						}
						if (td.filter === "Completed") {
							filteredTasks = filteredTasks.filter(
								(task) => task.isDone
							);
						}
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