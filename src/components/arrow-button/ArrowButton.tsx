import arrow from 'src/images/arrow.svg';
import classNames from 'classnames';

import styles from './ArrowButton.module.scss';
import { useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonState = 'default' | 'hover' | 'pressed' | 'closed';

interface ArrowButtonProps {
	isVisible?: boolean;
	stateArrowButton?: ArrowButtonState;
	onClick?: OnClick;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isVisible,
	stateArrowButton = 'default',
	onClick,
}) => {
	const [state, setState] = useState<ArrowButtonState>(stateArrowButton);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNames(styles.container, {
				[styles.container_open]: isVisible,
				[styles.container_hover]: state === 'hover',
				[styles.container_pressed]: state === 'pressed',
				[styles.container_closed]: state === 'closed',
			})}
			onMouseEnter={() => setState('hover')}
			onMouseLeave={() => setState('default')}
			onMouseDown={() => setState('pressed')}
			onMouseUp={() => setState('default')}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={classNames(styles.arrow, {
					[styles.arrow_open]: isVisible,
				})}
			/>
		</div>
	);
};
