import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, SyntheticEvent, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type TArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
}: TArticleParamsFormProps) => { 
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const formElementRef = useRef<HTMLDivElement | null>(null);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		state.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		state.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		state.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(state.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		state.contentWidth
	);

	const onClick = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsOpen((prevState) => !prevState);
	};

	const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setState({
			...state,
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const handleClearForm = () => {
		setState(defaultArticleState);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formElementRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton onClick={onClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formElementRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
					/>
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClearForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
