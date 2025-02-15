import { useRef, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { OptionType } from 'src/constants/articleProps';
import { Text } from '../text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
};

export const Option = ({ option, onClick }: OptionProps) => {
	const { value, title, optionClassName, className } = option;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
		console.log(`Выбрана опция: ${title}`);
		onClick(value);
	};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
