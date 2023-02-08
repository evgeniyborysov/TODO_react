import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	FilterValueType,
	RemoveTodoListAC,
	TodolistDomainType,
	todoListsReducer,
} from "./todoLists-reducer";
import { v1 } from "uuid";

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
	todolistID1 = v1();
	todolistID2 = v1();
	startState = [
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
	];
});

test("correct todolist should be removed", () => {
	const action = RemoveTodoListAC(todolistID1);
	const endState = todoListsReducer(startState, action);

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistID2);
});

test("correct todolist should be added", () => {
	const newTodolistTitle = "New Todolist";
	const action = AddTodoListAC(newTodolistTitle);
	const endState = todoListsReducer(startState, action);

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
	const newTodolistTitle = "New Todolist";
	const action = ChangeTodoListTitleAC(todolistID2, newTodolistTitle);
	const endState = todoListsReducer(startState, action);

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
	const newFilter: FilterValueType = "Active";
	const action = ChangeTodoListFilterAC(todolistID2, newFilter);
	const endState = todoListsReducer(startState, action);

	expect(endState[0].filter).toBe("All");
	expect(endState[1].filter).toBe(newFilter);
});
