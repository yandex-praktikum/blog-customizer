import { clsx } from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
  isOpen: boolean;
  onClick: OnClick;
};

export const ArrowButton = ({
  isOpen,
  onClick,
}: ArrowButtonProps): React.JSX.Element => {
  return (
    /* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0}
      className={clsx(styles.container, { [styles.container_open]: isOpen })}
      onClick={onClick}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
      />
    </div>
  );
};
