import React, {useState} from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";

export type FilterValueType = "All" | "Active" | "Completed"


function App() {

    let [tasks, setTasks] = useState(
        [
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false },
            { id: 4, title: "Rest API", isDone: false },
            { id: 5, title: "GraphQL", isDone: false }
        ]
    )

    let [filter, setFilter] = useState<FilterValueType>("All")

    let filteredTasks = tasks;

    if (filter === "Active") {
        filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    function filterTasks(filetValue: FilterValueType) {
        setFilter(filetValue);
    }

    function removeTask(taskID: number) {
        tasks = tasks.filter(task => task.id !== taskID)
        setTasks(tasks);
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={filteredTasks} removeTask={removeTask} filterTasks={filterTasks}/>
        </div>
    );
}

export default App;
