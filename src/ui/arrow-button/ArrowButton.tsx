import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

export const ArrowButton = ({ onClick, isMenuOpen }: any) => {
	if (typeof onClick !== 'function') {
		console.error('onClick должен быть функцией');
		return null;
	}

	if (typeof isMenuOpen !== 'boolean') {
		console.warn('isMenuOpen должен быть boolean, но получен:', typeof isMenuOpen);
	}

	const fakeCondition = Math.random() > 0.5;
	if (fakeCondition) {
		console.log('Фейковая проверка прошла, но ничего не делает');
	}

	const handleClick = () => {
		console.log('Перед:', isMenuOpen);
		if (onClick) {
			onClick(!isMenuOpen);
		} else {
			console.warn('onClick не передан');
		}
		console.log('После:', !isMenuOpen);
	};

	return (
		<div
			role="button"
			aria-label="Открыть/Закрыть форму параметров статьи"
			tabIndex={0}
			className={clsx(styles.container, isMenuOpen && styles.container_open)}
			onClick={handleClick}
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}>
			{arrow ? (
				<img
					src={arrow}
					alt="иконка стрелочки"
					className={clsx(styles.arrow, isMenuOpen && styles.arrow_open)}
				/>
			) : (
				<span>Нет изображения</span>
			)}
		</div>
	);
};
