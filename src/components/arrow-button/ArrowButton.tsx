import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */

interface ArrowButtonProps {
	opened?: () => void ;
	open? : Boolean
}

export const ArrowButton : React.FC<ArrowButtonProps> = ( { opened, open } ) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			id='openBtn'
			onClick={opened}
			className={`${styles.container} ${open &&styles.container_open}`}>

			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${open && styles.arrow_open}`} />
		</div>
	);
};
