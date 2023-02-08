import axios from "axios";

export type TodolistType = {
	id: string;
	addedDate: string;
	order: number;
	title: string;
};

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: Array<string>;
	fieldsErrors: Array<string>;
	data: D;
};

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}

export type TaskType = {
	description: string;
	title: string;
	status: TaskStatuses;
	priority: TaskPriorities;
	startDate: string;
	deadline: string;
	id: string;
	todoListId: string;
	order: number;
	addedDate: string;
};

export type UpdateTaskModelType = {
	title: string;
	description: string;
	status: number;
	priority: number;
	startDate: string;
	deadline: string;
};

type TasksResponse = {
	error: string | null;
	totalCount: number;
	items: TaskType[];
};

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.1/",
	withCredentials: true,
	headers: {
		"API-KEY": "a6578e5d-5c11-4c9c-864b-3f05fdea55d6",
	},
});

export const todolistAPI = {
	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {
			title: title,
		});
		return promise;
	},
	getTodolists() {
		const promise = instance.get<Array<TodolistType>>("todo-lists");
		return promise;
	},
	createTodolist(title: string) {
		const promise = instance.post<ResponseType<{ item: TodolistType }>>(
			"todo-lists",
			{
				title: title,
			}
		);
		return promise;
	},
	deleteTodolist(TodolistID: string) {
		const promise = instance.delete<ResponseType>(
			`todo-lists/${TodolistID}`
		);
		return promise;
	},
	getTasks(TodolistID: string) {
		return instance.get<TasksResponse>(`todo-lists/${TodolistID}/tasks`);
	},
	createTask(TodolistID: string, title: string) {
		return instance.post<ResponseType<TaskType>>(
			`todo-lists/${TodolistID}/tasks`,
			{
				title: title,
			}
		);
	},
	updateTask(TodolistID: string, TaskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseType<TaskType>>(
			`todo-lists/${TodolistID}/tasks/${TaskId}`,
			model
		);
	},
	deleteTask(TodolistID: string, TaskId: string) {
		return instance.delete<ResponseType>(
			`todo-lists/${TodolistID}/tasks/${TaskId}`
		);
	},
};
