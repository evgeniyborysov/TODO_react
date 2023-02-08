import { TaskPriorities, TaskStatuses } from "../API/todolist-api";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	TasksReducer,
	TasksType,
} from "./tasks-reducer";

import { AddTodoListAC, RemoveTodoListAC } from "./todoLists-reducer";

let todolistID1: string;
let todolistID2: string;
let startState: TasksType;

beforeEach(() => {
	todolistID1 = "todolistID1";
	todolistID2 = "todolistID2";
	startState = {
		todolistID1: [
			{
				id: "1",
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
				id: "2",
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
		todolistID2: [
			{
				id: "1",
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
				id: "2",
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
});

test("correct task should be added", () => {
	const newTitle = "TS";
	const action = AddTaskAC(todolistID1, newTitle);
	const endState = TasksReducer(startState, action);

	expect(endState[todolistID1].length).toBe(3);
	expect(endState[todolistID1][0].title).toBe(newTitle);
	expect(endState[todolistID2].length).toBe(2);
});

test("correct task should be removed", () => {
	const action = RemoveTaskAC(todolistID2, "2");
	const endState = TasksReducer(startState, action);

	expect(endState[todolistID1].length).toBe(2);
	expect(endState[todolistID2].length).toBe(1);
	expect(endState[todolistID2][0].title).toBe("Milk");
});

test("correct task should change its name", () => {
	const newTaskTitle = "Egg";
	const action = ChangeTaskTitleAC(todolistID2, "2", newTaskTitle);
	const endState = TasksReducer(startState, action);

	expect(endState[todolistID1].length).toBe(2);
	expect(endState[todolistID2].length).toBe(2);
	expect(endState[todolistID2][0].title).toBe("Milk");
});

test("correct task should change its status", () => {
	const action = ChangeTaskStatusAC(todolistID2, "2", TaskStatuses.New);
	const endState = TasksReducer(startState, action);

	expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed);
	expect(endState[todolistID2][1].status).toBe(TaskStatuses.New);
});

test("new array should be added when new todolist is added", () => {
	const action = AddTodoListAC("new todolist");
	const endState = TasksReducer(startState, action);
	const keys = Object.keys(endState);
	const newKey = keys.find((k) => k !== "todolistID1" && k !== "todolistID2");
	if (!newKey) {
		throw Error("new key should be added");
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
	const action = RemoveTodoListAC(todolistID2);
	const endState = TasksReducer(startState, action);
	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState["todolistID2"]).not.toBeDefined();
});
