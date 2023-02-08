import React, { useEffect, useState } from "react";
import { todolistAPI } from "../API/todolist-api";

export default {
	title: "API",
};

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null);
	useEffect(() => {
		todolistAPI.getTodolists().then((res) => {
			setState(res.data);
		});
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null);
	const [title, setTitle] = useState<string>("");

	const createTODO = () => {
		todolistAPI.createTodolist(title).then((res) => {
			setState(res.data);
		});
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO title"
					value={title}
					onChange={(e) => {
						setTitle(e.currentTarget.value);
					}}
				/>
				<button onClick={createTODO}>GO</button>
			</div>
			{JSON.stringify(state)}
		</div>
	);
};
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null);
	const [todoID, setTodoID] = useState<string>("");

	const deleteTodolist = () => {
		todolistAPI.deleteTodolist(todoID).then((res) => setState(res.data));
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO ID"
					value={todoID}
					onChange={(e) => {
						setTodoID(e.currentTarget.value);
					}}
				/>
				<button onClick={deleteTodolist}>GO</button>
			</div>
			{JSON.stringify(state)}
		</div>
	);
};
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null);
	const [todoID, setTodoID] = useState<string>("");
	const [newTitle, setNewTitle] = useState<string>("");

	const updateTitle = () => {
		todolistAPI
			.updateTodolist(todoID, newTitle)
			.then((res) => setState(res.data));
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO ID"
					value={todoID}
					onChange={(e) => {
						setTodoID(e.currentTarget.value);
					}}
				/>
				<input
					placeholder="New Title"
					value={newTitle}
					onChange={(e) => {
						setNewTitle(e.currentTarget.value);
					}}
				/>
				<button onClick={updateTitle}>GO</button>
			</div>
			{JSON.stringify(state)}
		</div>
	);
};

export const GetTasks = () => {
	const [state, setState] = useState<any>(null);
	const [todoID, setTodoID] = useState<string>("");

	const getTasks = () => {
		todolistAPI.getTasks(todoID).then((res) => setState(res.data));
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO ID"
					value={todoID}
					onChange={(e) => {
						setTodoID(e.currentTarget.value);
					}}
				/>
				<button onClick={getTasks}>GO</button>
			</div>

			{JSON.stringify(state)}
		</div>
	);
};

export const CreateTask = () => {
	const [state, setState] = useState<any>(null);
	const [todoID, setTodoID] = useState<string>("");
	const [title, setTitle] = useState<string>("");

	const createTask = () => {
		todolistAPI.createTask(todoID, title).then((res) => setState(res.data));
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO ID"
					value={todoID}
					onChange={(e) => setTodoID(e.currentTarget.value)}
				/>
				<input
					placeholder="Task title"
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
				<button onClick={createTask}>GO</button>
			</div>
			{JSON.stringify(state)}
		</div>
	);
};

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null);
	const [todoID, setTodoID] = useState<string>("");
	const [taskID, setTaskID] = useState<string>("");
	const [newTitle, setNewTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [status, setStatus] = useState<number>(0);
	const [priority, setPriority] = useState<number>(0);

	const updateTaskTitle = () => {
		todolistAPI
			.updateTask(todoID, taskID, {
				title: newTitle,
				description: description,
				status: status,
				priority: priority,
				startDate: "",
				deadline: "",
			})
			.then((res) => setState(res.data));
	};

	return (
		<div>
			<div>
				<input
					placeholder="TODO ID"
					value={todoID}
					onChange={(e) => setTodoID(e.currentTarget.value)}
				/>
				<input
					placeholder="Task ID"
					value={taskID}
					onChange={(e) => setTaskID(e.currentTarget.value)}
				/>
				<input
					placeholder="New Title"
					value={newTitle}
					onChange={(e) => setNewTitle(e.currentTarget.value)}
				/>
				<input
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.currentTarget.value)}
				/>
				<input
					placeholder="Status"
					value={status}
					onChange={(e) => setStatus(+e.currentTarget.value)}
				/>
				<input
					placeholder="Priority"
					value={priority}
					onChange={(e) => setPriority(+e.currentTarget.value)}
				/>
				<button onClick={updateTaskTitle}>GO</button>
			</div>
			{JSON.stringify(state)}
		</div>
	);
};

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null);
	const [taskID, setTaskID] = useState<string>("");
	const [todoID, setTodoID] = useState<string>("");

	const deleteTask = () => {
		todolistAPI.deleteTask(todoID, taskID).then((res) => {
			setState(res.data);
		});
	};

	return (
		<div>
			<div>
				<input
					placeholder={"todoID"}
					value={todoID}
					onChange={(e) => {
						setTodoID(e.currentTarget.value);
					}}
				/>
				<input
					placeholder={"taskID"}
					value={taskID}
					onChange={(e) => {
						setTaskID(e.currentTarget.value);
					}}
				/>
				<button onClick={deleteTask}>GO</button>
			</div>
			<div>{JSON.stringify(state)}</div>
		</div>
	);
};
