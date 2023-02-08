import { v1 } from "uuid";
import { TodolistType } from "../API/todolist-api";

export type FilterValueType = "All" | "Active" | "Completed";

export type TodolistDomainType = TodolistType & {
	filter: FilterValueType;
};

type ActionsType =
	| RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType;

const REMOVE_TODOLIST = "REMOVE_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE";
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER";

export type RemoveTodoListActionType = {
	type: typeof REMOVE_TODOLIST;
	todolistId: string;
};

export type AddTodoListActionType = {
	type: typeof ADD_TODOLIST;
	title: string;
	todoListId: string;
};

export type ChangeTodolistTitleActionType = {
	type: typeof CHANGE_TODOLIST_TITLE;
	id: string;
	title: string;
};

export type ChangeTodolistFilterActionType = {
	type: typeof CHANGE_TODOLIST_FILTER;
	id: string;
	filter: FilterValueType;
};

const initialState: Array<TodolistDomainType> = [];

export const todoListsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: ActionsType
): Array<TodolistDomainType> => {
	switch (action.type) {
		case REMOVE_TODOLIST: {
			return state.filter((td) => td.id !== action.todolistId);
		}

		case ADD_TODOLIST: {
			const newTodoList: TodolistDomainType = {
				id: action.todoListId,
				title: action.title,
				filter: "All",
				addedDate: "",
				order: 0,
			};
			return [...state, newTodoList];
		}

		case CHANGE_TODOLIST_TITLE: {
			return state.map((td) =>
				td.id === action.id ? { ...td, title: action.title } : td
			);
		}

		case CHANGE_TODOLIST_FILTER: {
			return state.map((td) =>
				td.id === action.id ? { ...td, filter: action.filter } : td
			);
		}

		default: {
			return state;
		}
	}
};

export const RemoveTodoListAC = (
	todolistId: string
): RemoveTodoListActionType => {
	return { type: REMOVE_TODOLIST, todolistId };
};

export const AddTodoListAC = (title: string): AddTodoListActionType => {
	return { type: ADD_TODOLIST, title, todoListId: v1() };
};

export const ChangeTodoListTitleAC = (
	todolistID: string,
	title: string
): ChangeTodolistTitleActionType => {
	return { type: CHANGE_TODOLIST_TITLE, id: todolistID, title };
};

export const ChangeTodoListFilterAC = (
	todolistID: string,
	filter: FilterValueType
): ChangeTodolistFilterActionType => {
	return { type: CHANGE_TODOLIST_FILTER, id: todolistID, filter };
};
