import { TasksType } from "../App";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	TasksReducer,
} from "./tasks-reducer";

import { AddTodoListAC, RemoveTodoListAC } from "./todoLists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TasksType;

beforeEach(()=>{
	todolistId1 = "todolistId1";
	todolistId2 = "todolistId2";
	startState = {
		todolistId1: [
			{ id: "1", title: "HTML&CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false },
		],
		todolistId2: [
			{ id: "1", title: "Milk", isDone: false },
			{ id: "2", title: "Bread", isDone: true },
			{ id: "3", title: "Tea", isDone: false },
		],
	};
})

test("correct task should be added", () => {
	const newTitle = "TS";
	const action = AddTaskAC(todolistId1, newTitle);
	const endState = TasksReducer(startState, action);

	expect(endState[todolistId1].length).toBe(4);
	expect(endState[todolistId1][0].title).toBe(newTitle);
	expect(endState[todolistId2].length).toBe(3);
});

test("correct task should be removed", () => {
	const action = RemoveTaskAC(todolistId2, "2");
	const endState = TasksReducer(startState, action);

	expect(endState[todolistId1].length).toBe(3);
	expect(endState[todolistId2].length).toBe(2);
	expect(endState[todolistId2][0].title).toBe("Milk");

	expect(endState).toEqual({
		[todolistId1]: [
			{ id: "1", title: "HTML&CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false },
		],
		[todolistId2]: [
			{ id: "1", title: "Milk", isDone: false },
			{ id: "3", title: "Tea", isDone: false },
		],
	});
});

test("correct task should change its name", () => {
	const newTaskTitle = "Egg";
	const action = ChangeTaskTitleAC(todolistId2, "2", newTaskTitle);
	const endState = TasksReducer(startState, action);

	expect(endState).toEqual({
		[todolistId1]: [
			{ id: "1", title: "HTML&CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false },
		],
		[todolistId2]: [
			{ id: "1", title: "Milk", isDone: false },
			{ id: "2", title: "Egg", isDone: true },
			{ id: "3", title: "Tea", isDone: false },
		],
	});
});

test("correct task should change its status", () => {
	const action = ChangeTaskStatusAC(todolistId2, "2", false);
	const endState = TasksReducer(startState, action);

	expect(endState[todolistId1][1].isDone).toBe(true);
	expect(endState[todolistId2][1].isDone).toBe(false);
});

test("new array should be added when new todolist is added", () => {
	const action = AddTodoListAC("new todolist");
	const endState = TasksReducer(startState, action);
	const keys = Object.keys(endState);
	const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
	if (!newKey) {
		throw Error("new key should be added");
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
	const action = RemoveTodoListAC(todolistId2);
	const endState = TasksReducer(startState, action);
	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});
