import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";

function App() {
    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ];
    const tasks2 = [
        { id: 1, title: "Meat", isDone: true },
        { id: 2, title: "Fish", isDone: false },
        { id: 3, title: "Beer", isDone: false },
    ];

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1} />
            <TodoList title={"What to buy"} tasks={tasks2} />
        </div>
    );
}

export default App;
