import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { SyntheticEvent, useState } from 'react';
import { clsx } from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type TArrowButtonProps = {
	onClick: (evt: SyntheticEvent) => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButtonProps) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ cursor: `${isHovering ? `pointer` : `default`}` }}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: !isOpen,
					[styles.arrow_open]: isOpen,
				})}
			/>
		</div>
	);
};
