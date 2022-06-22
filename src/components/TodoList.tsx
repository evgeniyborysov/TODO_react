import React, { ChangeEvent, useState } from "react";
import { FilterValueType } from "../App";
import { Button } from "./Button";
import { Input } from "./Input";
// import { TodoListInputFull } from "./TodoListInputFull";

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
};

export const TodoList = (props: TodoListPropsType) => {
    let [inputValue, setInputValue] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

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

    const addTODO = () => {
        const task = inputValue.trim();
        if (task !== "") {
            props.addTODO(task, props.todoListID);
            setInputValue("");
        } else {
            setError("Title is required!");
        }
    };

    return (
        <div>
            <h3>{props.title}</h3>
            {/* <TodoListInputFull addTask={props.addTask} /> */}
            <Input
                className={error ? "error" : ""}
                inputValue={inputValue}
                setInputValue={setInputValue}
                addTODO={addTODO}
                setError={setError}
                todoListID={props.todoListID}
            />
            <Button name={"+"} callBack={addTODO} />
            {error && <div className="error-message">{error}</div>}
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
                                <span className={task.isDone ? "isDone" : ""}>
                                    {task.title}
                                </span>
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
