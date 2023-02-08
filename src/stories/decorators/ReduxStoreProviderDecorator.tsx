import React from "react";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { v1 } from "uuid";
import { AppRootStateType } from "../../state/store";
import { TasksReducer } from "../../state/tasks-reducer";
import { todoListsReducer } from "../../state/todoLists-reducer";
import { TaskPriorities, TaskStatuses } from "../../API/todolist-api";

const rootReducer = combineReducers({
	tasks: TasksReducer,
	todolist: todoListsReducer,
});

let todolistID1 = v1();
let todolistID2 = v1();

const initialGlobalState = {
	todolist: [
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
	],
	tasks: {
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
		],
	},
};

export const storyBookStore = createStore(
	rootReducer,
	initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
	<Provider store={storyBookStore}>{storyFn()}</Provider>
);
