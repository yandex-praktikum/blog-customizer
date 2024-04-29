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
	articleState: ArticleStateType;
	setArticleState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const formElementRef = useRef<HTMLDivElement | null>(null);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		articleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		articleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		articleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(articleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		articleState.contentWidth
	);

	const onClick = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsMenuOpen((prevState) => !prevState);
	};

	const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const handleClearForm = () => {
		setArticleState(defaultArticleState);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formElementRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton onClick={onClick} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
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
