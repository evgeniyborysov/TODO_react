import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EditableSpan } from "../components/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Todolist/EditableSpan",
	component: EditableSpan,
	argTypes: {
		onChange: {
			action: "Title changed",
		},
	},
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => (
	<EditableSpan {...args} />
);

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
	title: "title",
};
