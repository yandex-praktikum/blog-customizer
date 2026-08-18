import { clsx } from 'clsx';
import { useRef } from 'react';
import { Text } from 'src/ui/text';

import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import type { MouseEventHandler } from 'react';
import type { OptionType } from 'src/constants/articleProps';

import styles from './Select.module.scss';

type OptionProps = {
  option: OptionType;
  onClick: (value: OptionType['value']) => void;
};

export const Option = (props: OptionProps): React.JSX.Element => {
  const {
    option: { value, title, optionClassName, className },
    onClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
    (): void => {
      onClick(clickedValue);
    };

  useEnterOptionSubmit({
    optionRef,
    value,
    onClick,
  });

  return (
    <li
      className={clsx(
        styles.option,
        (styles as Record<string, string>)[optionClassName ?? '']
      )}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      ref={optionRef}
    >
      <Text family={isFontFamilyClass(className) ? className : undefined}>{title}</Text>
    </li>
  );
};
