import { Text } from 'components/text';
import styles from './Button.module.scss';
import { useState } from 'react';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	const [color, setColor] = useState('black');

	const handleMouseEnter = () => {
		if (type === 'reset') {
			setColor('white');
		}
	};

	const handleMouseLeave = () => {
		if (type === 'reset') {
			setColor('black');
		}
	};

	return (
		<button
			className={styles.button}
			type={type}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Text color={color} weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
