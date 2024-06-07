import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (isOpenForm: boolean) => void;

export type TArrowButton = {
	isOpenForm: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ isOpenForm, onClick }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isOpenForm,
			})}
			onClick={() => {
				onClick(!isOpenForm);
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isOpenForm,
				})}
			/>
		</div>
	);
};
