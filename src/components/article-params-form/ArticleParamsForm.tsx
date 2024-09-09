import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { OptionType } from 'src/constants/articleProps';
import {fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState} from 'src/constants/articleProps';
import { ArticleStateType } from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	setArticleState: ( state : ArticleStateType ) => void
}

export const ArticleParamsForm : React.FC<ArticleParamsFormProps> = ({setArticleState}) => {

	const [isOpen, setIsOpen] = useState(false);
	const [fontFamilyOption, setFontFamilyOption] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const sidebar = useRef<HTMLDivElement>(null);

	function close (event : Event){
		const target : HTMLElement = event.target as HTMLElement;
		const current : HTMLElement = sidebar.current as HTMLElement;
		if(!current.contains(target) && !target.closest('#openBtn')){
			setIsOpen(false)
			document.body.removeEventListener('mousedown', close)
		}
	}

	useEffect(() => {
		if(isOpen){
			document.body.addEventListener('mousedown', close)
		}
	}, [isOpen])



	const handleSubmit = (event: { preventDefault: () => void}) => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			contentWidth,
			backgroundColor
		})

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
			<ArrowButton isOpen={isOpen} opened={() => setIsOpen(!isOpen)} />
			<aside ref={sidebar} className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select options={fontFamilyOptions} placeholder={''} selected={fontFamilyOption} onChange={(selected) => setFontFamilyOption(selected)} title={'Шрифт'} />
					<RadioGroup name={'fontSize'} options={fontSizeOptions} selected={fontSizeOption} onChange={(value) => setFontSizeOption(value)} title={'Размер шрифта'} />
					<Select options={fontColors} placeholder={''} selected={fontColor} onChange={(selected) => setFontColor(selected)} title={'Цвет шрифта'} />
					<Separator />
					<Select options={backgroundColors} placeholder={''} selected={backgroundColor} onChange={(selected) => setBackgroundColor(selected)} title={'Цвет фона'} />
					<Select options={contentWidthArr} placeholder={''} selected={contentWidth} onChange={(selected) => setContentWidth(selected)} title={'Ширина контента'} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleResetSubmit} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
