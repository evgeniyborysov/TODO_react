import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import { TodoListInputFull } from "./components/TodoListInputFull";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import { FilterValueType, TodolistDomainType } from "./state/todoLists-reducer";
import { TaskPriorities, TaskStatuses } from "./API/todolist-api";
import { TasksType } from "./state/tasks-reducer";

function App() {
	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
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

	let [tasks, setTasks] = useState<TasksType>({
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
			{
				id: v1(),
				title: "ReactJS",
				todoListId: todolistID1,
				status: TaskStatuses.New,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "Rest API",
				todoListId: todolistID1,
				status: TaskStatuses.New,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "GraphQL",
				todoListId: todolistID1,
				status: TaskStatuses.New,
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
			{
				id: v1(),
				title: "Meat",
				todoListId: todolistID2,
				status: TaskStatuses.New,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "Pizza",
				todoListId: todolistID2,
				status: TaskStatuses.New,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
			{
				id: v1(),
				title: "Vine",
				todoListId: todolistID2,
				status: TaskStatuses.New,
				description: "",
				order: 0,
				deadline: "",
				addedDate: "",
				priority: TaskPriorities.Low,
				startDate: "",
			},
		],
	});

	function addTodoList(title: string) {
		const newTodoListID = v1();
		const newTodoList: TodolistDomainType = {
			id: newTodoListID,
			title: title,
			filter: "All",
			addedDate: "",
			order: 0,
		};
		setTodolists([newTodoList, ...todolists]);
		setTasks({ ...tasks, [newTodoListID]: [] });
	}

	const removeTodoList = (todoListID: string) => {
		setTodolists(todolists.filter((td) => td.id !== todoListID));
		delete tasks[todoListID];
		setTasks({ ...tasks });
	};

	const addTODO = (title: string, todoListID: string) => {
		const task = {
			id: v1(),
			title: title,
			todoListId: todoListID,
			status: TaskStatuses.New,
			description: "",
			order: 0,
			deadline: "",
			addedDate: "",
			priority: TaskPriorities.Low,
			startDate: "",
		};
		// const todolistTasks = tasks[todoListID];
		// const newTasks = [task, ...todolistTasks];
		// tasks[todoListID] = newTasks;
		setTasks({ ...tasks, [todoListID]: [task, ...tasks[todoListID]] });
	};

	const changeTaskStatus = (
		taskID: string,
		status: TaskStatuses,
		todolistsID: string
	) => {
		let todoListTasks = tasks[todolistsID];
		let task = todoListTasks.find((task) => task.id === taskID);
		if (task) {
			task.status = status;
			setTasks({ ...tasks });
		}
	};

	function filterTasks(filetValue: FilterValueType, todolistsID: string) {
		let todolist = todolists.find((tl) => tl.id === todolistsID);
		if (todolist) {
			todolist.filter = filetValue;
			setTodolists([...todolists]);
		}
	}

	function removeTask(taskID: string, todolistsID: string) {
		// tasks = tasks.filter((task) => task.id !== taskID);
		// setTasks(tasks);
		setTasks({
			...tasks,
			[todolistsID]: tasks[todolistsID].filter(
				(task) => task.id !== taskID
			),
		});
	}

	function editTaskTitle(todolistsID: string, taskID: string, title: string) {
		setTasks({
			...tasks,
			[todolistsID]: tasks[todolistsID].map((task) =>
				task.id === taskID ? { ...task, title: title } : task
			),
		});
	}

	function editTodoListTitle(todolistsID: string, title: string) {
		setTodolists(
			todolists.map((td) =>
				td.id === todolistsID ? { ...td, title: title } : td
			)
		);
	}

	return (
		<div className="App">
			<ButtonAppBar />
			<Container fixed>
				<Grid container style={{ padding: "10px" }}>
					<TodoListInputFull
						callBack={addTodoList}
						name={"Add task"}
					/>
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

export default App;
