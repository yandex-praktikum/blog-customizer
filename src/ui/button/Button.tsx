import { Text } from 'src/ui/text';

import styles from './Button.module.scss';
import { clsx } from 'clsx';

export const Button = ({
	title,
	onClick,
	htmlType,
	type,
}: {
	title: string;
	onClick?: () => void;
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	type: 'apply' | 'clear';
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles.button_apply]: type === 'apply' },
				{ [styles.button_clear]: type === 'clear' }
			)}
			type={htmlType}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
