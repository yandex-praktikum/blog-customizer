import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	isVisible?: boolean;
	onClick?: OnClick;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isVisible,
	onClick,
}) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isVisible,
			})}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isVisible,
				})}
			/>
		</div>
	);
};
