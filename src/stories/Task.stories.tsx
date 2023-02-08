import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Task } from "../components/Task";
import { TaskStatuses } from "../API/todolist-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Todolist/Task",
	component: Task,
	argTypes: {
		editTaskTitle: {
			action: "Title changed",
		},
		changeTaskStatus: {
			action: "Status changed",
		},
		removeTask: {
			action: "Task remove button clicked",
		},
	},
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
	title: "JS",
	taskID: "1",
	status: TaskStatuses.Completed,
	todoListID: "TD2",
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
	title: "CSS",
	taskID: "2",
	status: TaskStatuses.New,
	todoListID: "TD1",
};
