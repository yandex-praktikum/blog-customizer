import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	argTypes: {
		isVisible: {
			control: { type: 'boolean' },
			description: 'Показывает или скрывает форму',
		},
		onClick: {
			action: 'clicked',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	args: {
		isVisible: false,
	},
	render: (args) => {
		return (
			<>
				<ArrowButton {...args} />
			</>
		);
	},
};
