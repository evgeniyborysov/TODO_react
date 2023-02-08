import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// import { Button } from "./Button";
import { TodoListInputFull } from "../components/TodoListInputFull";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Todolist/Input",
	component: TodoListInputFull,
	argTypes: {
		callBack: {
			action: "Button clicked",
		},
	},
} as ComponentMeta<typeof TodoListInputFull>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoListInputFull> = (args) => (
	<TodoListInputFull {...args} />
);

export const InputExample = Template.bind({});
InputExample.args = {};
