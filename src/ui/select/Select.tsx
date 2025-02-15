import { useState, useRef, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { OptionType } from 'src/constants/articleProps';
import { Text } from '../../ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

export const Select = ({ options, placeholder, selected, onChange, onClose, title }: SelectProps) => {
	const [isMenuOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};

	const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isMenuOpen}
				data-testid="selectWrapper">
				<img
					src={arrowDown}
					alt="иконка стрелочки"
					className={clsx(styles.arrow, { [styles.arrow_open]: isMenuOpen })}
				/>
				<div
					className={clsx(styles.placeholder, styles[selected?.optionClassName || ''])}
					data-selected={!!selected?.value}
					onClick={handlePlaceholderClick}
					role="button"
					tabIndex={0}
					ref={placeholderRef}>
					<Text family={isFontFamilyClass(selected?.className) ? selected?.className : undefined}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isMenuOpen && (
					<ul className={styles.select} data-testid="selectDropdown">
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option key={option.value} option={option} onClick={() => handleOptionClick(option)} />
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
