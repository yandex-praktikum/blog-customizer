import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	title: 'Components/ArrowButton',
	argTypes: {
		isVisible: {
			control: { type: 'boolean' },
			description: 'Показывает или скрывает форму',
		},
		stateArrowButton: {
			control: {
				type: 'radio',
				options: ['default', 'hover', 'pressed', 'closed'],
			},
			description: 'Состояние кнопки: default, hover, pressed, closed',
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
		stateArrowButton: 'default',
	},
	render: (args) => {
		return (
			<>
				<ArrowButton {...args} />
			</>
		);
	},
};
