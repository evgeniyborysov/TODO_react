import React, { useReducer } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
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
	FilterValueType,
} from "./state/todoLists-reducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	TasksReducer,
	TasksType,
} from "./state/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "./API/todolist-api";

function AppWithReducers() {
	let todolistID1 = v1();
	let todolistID2 = v1();

	const initTasks: TasksType = {
		[todolistID1]: [
			{
				id: v1(),
				title: "HTML&CSS",
				todoListId: todolistID1,
				status: TaskStatuses.Completed,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "JS",
				todoListId: todolistID1,
				status: TaskStatuses.Completed,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
		],
		[todolistID2]: [
			{
				id: v1(),
				title: "Milk",
				todoListId: todolistID2,
				status: TaskStatuses.Completed,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "Eggs",
				todoListId: todolistID2,
				status: TaskStatuses.Completed,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
		],
	};

	let [todolists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
		{
			id: todolistID1,
			title: "What to learn",
			filter: "All",
			addedDate: "",
			order: 0,
		},
		{
			id: todolistID2,
			title: "What to buy",
			filter: "All",
			addedDate: "",
			order: 0,
		},
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
		status: TaskStatuses,
		todolistsID: string
	) => {
		const action = ChangeTaskStatusAC(todolistsID, taskID, status);
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
								(task) => task.status === TaskStatuses.New
							);
						}
						if (td.filter === "Completed") {
							filteredTasks = filteredTasks.filter(
								(task) => task.status === TaskStatuses.Completed
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
