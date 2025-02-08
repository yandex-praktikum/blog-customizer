import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
    return (
        <div
            role='button'
            aria-label='Открыть/Закрыть форму параметров статьи'
            tabIndex={0}
            className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={() => {
				console.log('кнопка нажата');
				onClick();
			  }}
        >
            <img
                src={arrow}
                alt='иконка стрелочки'
                className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
            />
        </div>
    );
};
