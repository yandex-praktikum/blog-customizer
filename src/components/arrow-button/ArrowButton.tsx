import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */

interface ArrowButtonProps {
	opened?: () => void ;
	isOpen? : Boolean
}

export const ArrowButton : React.FC<ArrowButtonProps> = ( { opened, isOpen } ) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			id='openBtn'
			onClick={opened}
			className={clsx(styles.container, isOpen && styles.container_open)}>

			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow,isOpen && styles.arrow_open)} />
		</div>
	);
};
