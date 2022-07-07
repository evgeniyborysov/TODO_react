import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import React, { ChangeEvent } from "react";
import { FilterValueType } from "../App";
import { ButtonAppBar } from "./ButtonAppBar";
// import { Button } from "./Button";
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
                <IconButton
                    onClick={() => {
                        props.removeTodoList(props.todoListID);
                    }}
                >
                    <Delete />
                </IconButton>
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
                            {/* <input
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
                                /> */}
                            <Checkbox
                                // {...label}
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

                            <IconButton
                                onClick={() => {
                                    onClickRemoveTaskHandler(
                                        task.id,
                                        props.todoListID
                                    );
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    variant={props.filter === "All" ? "contained" : "outlined"}
                    color={"secondary"}
                    size={"small"}
                    onClick={() => {
                        onClickFilterButtonHandler("All", props.todoListID);
                    }}
                >
                    All
                </Button>
                <Button
                    variant={
                        props.filter === "Active" ? "contained" : "outlined"
                    }
                    color={"success"}
                    size={"small"}
                    onClick={() => {
                        onClickFilterButtonHandler("Active", props.todoListID);
                    }}
                >
                    Active
                </Button>
                <Button
                    variant={
                        props.filter === "Completed" ? "contained" : "outlined"
                    }
                    color={"error"}
                    size={"small"}
                    onClick={() => {
                        onClickFilterButtonHandler(
                            "Completed",
                            props.todoListID
                        );
                    }}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};
