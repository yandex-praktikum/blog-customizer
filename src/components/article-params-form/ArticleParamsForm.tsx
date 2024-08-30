import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { OptionType } from 'src/constants/articleProps';
import {fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import { ArticleStateType } from '../../constants/articleProps';


interface ArticleParamsFormProps {
	articleState: ArticleStateType
	setArticleState: (articleState: ArticleStateType) => void
	opened?: () => void;
	open? : Boolean
}

export const ArticleParamsForm : React.FC<ArticleParamsFormProps> = ({articleState, setArticleState, opened, open}) => {


	const [fontFamilyOption, setFontFamilyOption] = useState<OptionType>(articleState.fontFamilyOption);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(articleState.fontColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(articleState.contentWidth);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(articleState.backgroundColor);

	const handleSubmit = (event: { preventDefault: () => void}) => {
		event.preventDefault();
		const states = { fontFamilyOption, fontSizeOption, fontColor, contentWidth, backgroundColor }
		setArticleState(states);
	}

	const handleResetSubmit = () => {
		setArticleState(defaultArticleState)
		setFontFamilyOption(defaultArticleState.fontFamilyOption)
		setFontSizeOption(defaultArticleState.fontSizeOption)
		setFontColor(defaultArticleState.fontColor)
		setContentWidth(defaultArticleState.contentWidth)
		setBackgroundColor(defaultArticleState.backgroundColor)
	}

	return (
		<>
			<ArrowButton open={open} opened={opened} />
			<aside className={`${styles.container} ${ open && styles.container_open}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select options={fontFamilyOptions} placeholder={''} selected={fontFamilyOption} onChange={(selected) => setFontFamilyOption(selected)} onClose={() => {}} title={'Шрифт'} />
					<RadioGroup name={'fontSize'} options={fontSizeOptions} selected={fontSizeOption} onChange={(value) => setFontSizeOption(value)} title={'Размер шрифта'} />;
					<Select options={fontColors} placeholder={''} selected={fontColor} onChange={(selected) => setFontColor(selected)} onClose={() => {}} title={'Цвет шрифта'} />
					<Separator />
					<Select options={backgroundColors} placeholder={''} selected={backgroundColor} onChange={(selected) => setBackgroundColor(selected)} onClose={() => {}} title={'Цвет фона'} />
					<Select options={contentWidthArr} placeholder={''} selected={contentWidth} onChange={(selected) => setContentWidth(selected)} onClose={() => {}} title={'Ширина контента'} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleResetSubmit} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
