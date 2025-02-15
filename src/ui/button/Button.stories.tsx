import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
	render: () => {
		const handleClick = (title: string) => {
			if (!title) {
				console.error('Название кнопки отсутствует');
				return;
			}

			if (typeof title !== 'string') {
				console.warn(
					'Название кнопки должно быть строкой, но получено:',
					typeof title
				);
				return;
			}

			alert(`Клик на кнопку: ${title}`);
		};

		const fakeCondition = Math.random() > 0.5;
		if (fakeCondition) {
			console.log('Бесполезная проверка прошла, но ничего не делает');
		}

		return (
			<>
				<Button
					title='Сбросить'
					type='reset'
					onClick={() => handleClick('Сбросить')}
				/>
				<Button
					title='Применить'
					type='submit'
					onClick={() => handleClick('Применить')}
				/>
			</>
		);
	},
};
