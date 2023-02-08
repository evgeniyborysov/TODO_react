import { TasksReducer, TasksType } from "./tasks-reducer";
import {
	todoListsReducer,
	AddTodoListAC,
	TodolistDomainType,
} from "./todoLists-reducer";

test("ids should be equals", () => {
	const startTasksState: TasksType = {};
	const startTodolistsState: Array<TodolistDomainType> = [];

	const action = AddTodoListAC("new todolist");

	const endTasksState = TasksReducer(startTasksState, action);
	const endTodolistsState = todoListsReducer(startTodolistsState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.todoListId);
	expect(idFromTodolists).toBe(action.todoListId);
});
