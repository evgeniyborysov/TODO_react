import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
	todoListsReducer,
} from "./todoLists-reducer";
import { FilterValueType, TodoListsType } from "../App";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListsType>;

beforeEach(()=> {
	todolistId1 = v1();
	todolistId2 = v1();
	startState= [
		{ id: todolistId1, title: "What to learn", filter: "All" },
		{ id: todolistId2, title: "What to buy", filter: "All" },
	];
})


test("correct todolist should be removed", () => {
	const action = RemoveTodoListAC(todolistId1);
	const endState = todoListsReducer(startState, action);

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
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
	const action = ChangeTodoListTitleAC(todolistId2, newTodolistTitle);
	const endState = todoListsReducer(startState, action);

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
	const newFilter: FilterValueType = "Active";
	const action = ChangeTodoListFilterAC(todolistId2, newFilter);
	const endState = todoListsReducer(startState, action);

	expect(endState[0].filter).toBe("All");
	expect(endState[1].filter).toBe(newFilter);
});
