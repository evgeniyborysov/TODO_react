import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v1 } from "uuid";

export type FilterValueType = "All" | "Active" | "Completed";

type TodoListsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        { id: todolistID1, title: "What to learn", filter: "All" },
        { id: todolistID2, title: "What to buy", filter: "All" },
    ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ],
    });

    const addTODO = (title: string, todoListID: string) => {
        const task = { id: v1(), title: title, isDone: false };
        // const todolistTasks = tasks[todoListID];
        // const newTasks = [task, ...todolistTasks];
        // tasks[todoListID] = newTasks;
        setTasks({ ...tasks, [todoListID]: [task, ...tasks[todoListID]] });
    };

    const changeTaskStatus = (
        taskID: string,
        isDone: boolean,
        todolistsID: string
    ) => {
        let todoListTasks = tasks[todolistsID];
        let task = todoListTasks.find((task) => task.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks });
        }
    };

    function filterTasks(filetValue: FilterValueType, todolistsID: string) {
        let todolist = todolists.find((tl) => tl.id === todolistsID);
        if (todolist) {
            todolist.filter = filetValue;
            setTodolists([...todolists]);
        }
    }

    function removeTask(taskID: string, todolistsID: string) {
        // tasks = tasks.filter((task) => task.id !== taskID);
        // setTasks(tasks);
        setTasks({
            ...tasks,
            [todolistsID]: tasks[todolistsID].filter(
                (task) => task.id !== taskID
            ),
        });
    }

    return (
        <div className="App">
            {todolists.map((td) => {
                let filteredTasks = tasks[td.id];

                if (td.filter === "Active") {
                    filteredTasks = filteredTasks.filter(
                        (task) => !task.isDone
                    );
                }
                if (td.filter === "Completed") {
                    filteredTasks = filteredTasks.filter((task) => task.isDone);
                }
                return (
                    <TodoList
                        key={td.id}
                        todoListID={td.id}
                        filter={td.filter}
                        title={td.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTODO={addTODO}
                        changeTaskStatus={changeTaskStatus}
                    />
                );
            })}
        </div>
    );
}

export default App;
