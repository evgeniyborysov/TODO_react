import React, { useState } from "react";
import "./App.css";
import { TodoList, TodoListTaskType } from "./components/TodoList";
import { v1 } from "uuid";
import { TodoListInputFull } from "./components/TodoListInputFull";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";

export type FilterValueType = "All" | "Active" | "Completed";

export type TodoListsType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

export type TasksType = {
    [key: string]: Array<TodoListTaskType>;
};

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        { id: todolistID1, title: "What to learn", filter: "All" },
        { id: todolistID2, title: "What to buy", filter: "All" },
    ]);

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Eggs", isDone: true },
            { id: v1(), title: "Meat", isDone: false },
            { id: v1(), title: "Pizza", isDone: false },
            { id: v1(), title: "Vine", isDone: false },
        ],
    });

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListsType = {
            id: newTodoListID,
            title: title,
            filter: "All",
        };
        setTodolists([newTodoList, ...todolists]);
        setTasks({ ...tasks, [newTodoListID]: [] });
    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter((td) => td.id !== todoListID));
        delete tasks[todoListID];
        setTasks({ ...tasks });
    };

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

    function editTaskTitle(todolistsID: string, taskID: string, title: string) {
        setTasks({
            ...tasks,
            [todolistsID]: tasks[todolistsID].map((task) =>
                task.id === taskID ? { ...task, title: title } : task
            ),
        });
    }

    function editTodoListTitle(todolistsID: string, title: string) {
        setTodolists(
            todolists.map((td) =>
                td.id === todolistsID ? { ...td, title: title } : td
            )
        );
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container style={{ padding: "10px" }}>
                    <TodoListInputFull callBack={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((td) => {
                        let filteredTasks = tasks[td.id];

                        if (td.filter === "Active") {
                            filteredTasks = filteredTasks.filter(
                                (task) => !task.isDone
                            );
                        }
                        if (td.filter === "Completed") {
                            filteredTasks = filteredTasks.filter(
                                (task) => task.isDone
                            );
                        }
                        return (
                            <Grid item>
                                <Paper style={{ padding: "10px" }}>
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
                                        removeTodoList={removeTodoList}
                                        editTaskTitle={editTaskTitle}
                                        editTodoListTitle={editTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
