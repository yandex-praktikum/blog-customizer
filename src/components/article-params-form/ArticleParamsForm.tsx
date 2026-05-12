import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply?: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const refElement = useRef<HTMLDivElement>(null);

	const openButton = () => {
		setOpen(open === true ? false : true);
	};

	useOutsideClickClose({
		isOpen: open,
		rootRef: refElement,
		onChange: setOpen,
	});

	const handleFontChange = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBgColorChange = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handletWidthChange = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const applyButton = () => {
		if (onApply) {
			onApply(formState);
		}
	};

	const deleteButton = () => {
		setFormState(defaultArticleState);
		if (onApply) {
			onApply(formState);
		}
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={openButton} />
			{open && (
				<aside
					ref={refElement}
					className={`${styles.container} ${
						open ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontChange}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBgColorChange}
						/>

						<Select
							title='ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handletWidthChange}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={deleteButton}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={applyButton}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
