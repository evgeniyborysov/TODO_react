import React, { ChangeEvent } from "react";
import { FilterValueType } from "../App";
import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";
// import { Input } from "./Input";
import { TodoListInputFull } from "./TodoListInputFull";

export type TodoListTaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    todoListID: string;
    filter: FilterValueType;
    title: string;
    tasks: Array<TodoListTaskType>;
    removeTask: (taskID: string, todolistsID: string) => void;
    filterTasks: (filetValue: FilterValueType, todoListID: string) => void;
    addTODO: (title: string, todoListID: string) => void;
    changeTaskStatus: (
        taskID: string,
        isDone: boolean,
        todolistsID: string
    ) => void;
    removeTodoList: (todoListID: string) => void;
    editTaskTitle: (todolistsID: string, taskID: string, title: string) => void;
    editTodoListTitle: (todolistsID: string, title: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
    const onClickFilterButtonHandler = (
        filterValue: FilterValueType,
        todoListID: string
    ) => {
        props.filterTasks(filterValue, todoListID);
    };

    const onClickRemoveTaskHandler = (id: string, todolistsID: string) => {
        props.removeTask(id, todolistsID);
    };

    const onClickChangeTaskStatusHandler = (
        id: string,
        isDone: boolean,
        todolistsID: string
    ) => {
        props.changeTaskStatus(id, isDone, todolistsID);
    };

    const editTaskTitle = (
        todolistsID: string,
        taskID: string,
        title: string
    ) => {
        props.editTaskTitle(todolistsID, taskID, title);
    };

    const editTodoListTitle = (todolistsID: string, title: string) => {
        props.editTodoListTitle(todolistsID, title);
    };

    return (
        <div>
            <div>
                {/* <h3>{props.title}</h3> */}
                <EditableSpan
                    title={props.title}
                    onChange={(title) => {
                        editTodoListTitle(props.todoListID, title);
                    }}
                />
                <Button
                    name={"✖"}
                    callBack={() => props.removeTodoList(props.todoListID)}
                />
            </div>

            <TodoListInputFull
                callBack={(task: string) =>
                    props.addTODO(task, props.todoListID)
                }
            />
            {/* <Input
                className={error ? "error" : ""}
                inputValue={inputValue}
                setInputValue={setInputValue}
                addTODO={addTODO}
                setError={setError}
                todoListID={props.todoListID}
            /> */}
            {/* <Button name={"+"} callBack={addTODO} /> */}
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        onClickChangeTaskStatusHandler(
                                            task.id,
                                            event.currentTarget.checked,
                                            props.todoListID
                                        )
                                    }
                                />
                                {/* <span className={task.isDone ? "isDone" : ""}>
                                    {task.title}****
                                </span> */}
                                <EditableSpan
                                    title={task.title}
                                    onChange={(title) => {
                                        editTaskTitle(
                                            props.todoListID,
                                            task.id,
                                            title
                                        );
                                    }}
                                />
                            </label>

                            <Button
                                name={"✖"}
                                callBack={() =>
                                    onClickRemoveTaskHandler(
                                        task.id,
                                        props.todoListID
                                    )
                                }
                            />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    className={props.filter === "All" ? "active" : ""}
                    name={"All"}
                    callBack={() =>
                        onClickFilterButtonHandler("All", props.todoListID)
                    }
                />
                <Button
                    className={props.filter === "Active" ? "active" : ""}
                    name={"Active"}
                    callBack={() =>
                        onClickFilterButtonHandler("Active", props.todoListID)
                    }
                />
                <Button
                    className={props.filter === "Completed" ? "active" : ""}
                    name={"Completed"}
                    callBack={() =>
                        onClickFilterButtonHandler(
                            "Completed",
                            props.todoListID
                        )
                    }
                />
            </div>
        </div>
    );
};
