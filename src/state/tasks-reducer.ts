import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType } from "../API/todolist-api";
import {
	AddTodoListActionType,
	RemoveTodoListActionType,
} from "./todoLists-reducer";

export type TasksType = {
	[key: string]: Array<TaskType>;
};

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
const REMOVE_TODOLIST = "REMOVE_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";

type ActionsType =
	| AddTaskActionType
	| RemoveTaskActionType
	| ChangeTaskTitleActionType
	| ChangeTaskStatusActionType
	| RemoveTodoListActionType
	| AddTodoListActionType;

export type AddTaskActionType = {
	type: typeof ADD_TASK;
	todoListId: string;
	title: string;
};

export type RemoveTaskActionType = {
	type: typeof REMOVE_TASK;
	todoListId: string;
	taskID: string;
};

export type ChangeTaskTitleActionType = {
	type: typeof CHANGE_TASK_TITLE;
	todoListId: string;
	taskID: string;
	title: string;
};

export type ChangeTaskStatusActionType = {
	type: typeof CHANGE_TASK_STATUS;
	todoListId: string;
	taskID: string;
	status: TaskStatuses;
};

const initialState: TasksType = {};

export const TasksReducer = (
	state: TasksType = initialState,
	action: ActionsType
): TasksType => {
	switch (action.type) {
		case ADD_TASK: {
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				status: TaskStatuses.New,
				description: "",
				priority: TaskPriorities.Low,
				startDate: "",
				deadline: "",
				todoListId: action.todoListId,
				order: 0,
				addedDate: "",
			};
			return {
				...state,
				[action.todoListId]: [newTask, ...state[action.todoListId]],
			};
		}
		case REMOVE_TASK: {
			return {
				...state,
				[action.todoListId]: state[action.todoListId].filter(
					(task) => task.id !== action.taskID
				),
			};
		}
		case CHANGE_TASK_TITLE: {
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map((task) =>
					task.id === action.taskID
						? { ...task, title: action.title }
						: task
				),
			};
		}
		case CHANGE_TASK_STATUS: {
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map((task) =>
					task.id === action.taskID
						? { ...task, status: action.status }
						: task
				),
			};
		}
		case REMOVE_TODOLIST: {
			let copyState = { ...state };
			delete copyState[action.todolistId];
			return copyState;
		}
		case ADD_TODOLIST: {
			return { ...state, [action.todoListId]: [] };
		}
		default:
			return state;
	}
};

export const AddTaskAC = (
	todoListId: string,
	title: string
): AddTaskActionType => {
	return { type: ADD_TASK, todoListId, title };
};

export const RemoveTaskAC = (
	todoListId: string,
	taskID: string
): RemoveTaskActionType => {
	return { type: REMOVE_TASK, todoListId, taskID };
};

export const ChangeTaskTitleAC = (
	todoListId: string,
	taskID: string,
	title: string
): ChangeTaskTitleActionType => {
	return { type: CHANGE_TASK_TITLE, todoListId, taskID, title };
};

export const ChangeTaskStatusAC = (
	todoListId: string,
	taskID: string,
	status: TaskStatuses
): ChangeTaskStatusActionType => {
	return { type: CHANGE_TASK_STATUS, todoListId, taskID, status };
};
