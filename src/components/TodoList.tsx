import React from "react";
import { FilterValueType } from "../App";
import { Button } from "./Button";
import { Input } from "./Input";
// import { TodoListInputFull } from "./TodoListInputFull";

type TodoListTaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    title: string;
    tasks: Array<TodoListTaskType>;
    removeTask: (taskID: number) => void;
    filterTasks: (filetValue: FilterValueType) => void;
    addTask: (task: string) => void;
    inputValue: string;
    setinputValue: (inputValue: string) => void;
    addTODO: () => void;
};

export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            {/* <TodoListInputFull addTask={props.addTask} /> */}
            <Input
                inputValue={props.inputValue}
                setinputValue={props.setinputValue}
            />
            <Button name={"+"} callBack={props.addTODO} />
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>
                                ✖
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => props.filterTasks("All")}>All</button>
                <button onClick={() => props.filterTasks("Active")}>
                    Active
                </button>
                <button onClick={() => props.filterTasks("Completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};
