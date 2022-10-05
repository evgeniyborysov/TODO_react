import React, { useReducer } from "react";
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
	let todolistID1 = v1();
	let todolistID2 = v1();

	const initTasks = {
		[todolistID1]: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
			{ id: v1(), title: "ReactJS", isDone: false },
			{ id: v1(), title: "Rest API", isDone: false },
			{ id: v1(), title: "GraphQL", isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: "Milk", isDone: true },
			{ id: v1(), title: "Eggs", isDone: true },
			{ id: v1(), title: "Meat", isDone: false },
			{ id: v1(), title: "Pizza", isDone: false },
			{ id: v1(), title: "Vine", isDone: false },
		],
	};

	let [todolists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
		{ id: todolistID1, title: "What to learn", filter: "All" },
		{ id: todolistID2, title: "What to buy", filter: "All" },
	]);
	let [tasks, dispatchToTasksReducer] = useReducer(TasksReducer, initTasks);

	function addTodoList(title: string) {
		const action = AddTodoListAC(title);
		dispatchToTodolistsReducer(action);
		dispatchToTasksReducer(action);
	}

	const removeTodoList = (todoListID: string) => {
		const action = RemoveTodoListAC(todoListID);
		dispatchToTodolistsReducer(action);
		dispatchToTasksReducer(action);
	};

	const addTODO = (title: string, todoListID: string) => {
		const action = AddTaskAC(todoListID, title);
		dispatchToTasksReducer(action);
	};

	const changeTaskStatus = (
		taskID: string,
		isDone: boolean,
		todolistsID: string
	) => {
		const action = ChangeTaskStatusAC(todolistsID, taskID, isDone);
		dispatchToTasksReducer(action);
	};

	function filterTasks(filetValue: FilterValueType, todolistsID: string) {
		const action = ChangeTodoListFilterAC(todolistsID, filetValue);
		dispatchToTodolistsReducer(action);
	}

	function removeTask(taskID: string, todolistsID: string) {
		const action = RemoveTaskAC(todolistsID, taskID);
		dispatchToTasksReducer(action);
	}

	function editTaskTitle(todolistsID: string, taskID: string, title: string) {
		const action = ChangeTaskTitleAC(todolistsID, taskID, title);
		dispatchToTasksReducer(action);
	}

	function editTodoListTitle(todolistsID: string, title: string) {
		const action = ChangeTodoListTitleAC(todolistsID, title);
		dispatchToTodolistsReducer(action);
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
							<Grid item>
								<Paper style={{ padding: "10px" }}>
									<TodoList
										key={td.id}
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
