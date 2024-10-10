import type { Meta, StoryObj } from '@storybook/react';

import { Spacer } from './Spacer';

const meta: Meta<typeof Spacer> = {
	component: Spacer,
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const SelectStory: Story = {
	render: () => {
		return <Spacer />;
	},
};
