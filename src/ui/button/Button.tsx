import { Text } from '../../ui/text';
import styles from './Button.module.scss';

type ButtonProps = {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button = ({ title, onClick, type = 'button' }: ButtonProps) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
