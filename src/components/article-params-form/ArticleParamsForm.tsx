import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';

type ArticleParamsFormProps = {
	artState: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	artState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// Хуки
	const [selectedFamily, setSelectedFamily] = useState(
		artState.fontFamilyOption
	);
	const [selectedFontSize, setFontSize] = useState(artState.fontSizeOption);
	const [selectedFontColor, setFontColor] = useState(artState.fontColor);
	const [selectedBackground, setBackground] = useState(
		artState.backgroundColor
	);
	const [selectedWidth, setWidth] = useState(artState.contentWidth);
	// блокировка скрола в еффекте
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onApply({
			fontFamilyOption: selectedFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackground,
			contentWidth: selectedWidth,
		});

		// setIsOpen(false);
	};

	const handleReset = () => {
		setSelectedFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);

		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={
					isOpen
						? `${styles.container} ${styles.containerOpen}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						задайте параметры
					</Text>
					<Select
						selected={selectedFamily}
						onChange={setSelectedFamily}
						options={fontFamilyOptions}
						title='Шрифт'></Select>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={selectedFontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'></Select>
					<Separator />
					<Select
						selected={selectedBackground}
						onChange={setBackground}
						options={backgroundColors}
						title='Шрифт'></Select>
					<Select
						selected={selectedWidth}
						onChange={setWidth}
						options={contentWidthArr}
						title='Шрифт'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
