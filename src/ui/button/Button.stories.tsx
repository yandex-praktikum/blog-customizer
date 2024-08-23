import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
	render: () => {
		return (
			<div style={{ display: 'flex', gap: '10px' }}>
				<Button
					title='Применить'
					htmlType='submit'
					type='apply'
					onClick={() => alert('клик на кнопку применить')}
				/>
				<Button
					title='Сбросить'
					htmlType='reset'
					type='clear'
					onClick={() => alert('клик на кнопку сбросить')}
				/>
			</div>
		);
	},
};
