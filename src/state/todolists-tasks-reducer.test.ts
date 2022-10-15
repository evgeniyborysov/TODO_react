import { TasksType, TodoListsType } from "../App";
import { TasksReducer } from "./tasks-reducer";
import { todoListsReducer, AddTodoListAC } from "./todoLists-reducer";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListsType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action);
    const endTodolistsState = todoListsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});
