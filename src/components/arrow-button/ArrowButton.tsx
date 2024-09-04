import arrow from 'src/images/arrow.svg';

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
			className={`${styles.container}
			${isVisible ? styles.container_open : ''}`}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isVisible ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
