import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import { todoListsReducer } from "./todoLists-reducer";
import { TasksReducer } from "./tasks-reducer";

const rootReducer = combineReducers({
	todolist: todoListsReducer,
	tasks: TasksReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
