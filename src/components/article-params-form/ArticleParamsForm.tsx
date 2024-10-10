import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { RadioGroup } from '../radio-group'
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Spacer } from '../spacer';


interface propsArticleParamsForm {
	onChange?: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onChange }: propsArticleParamsForm) => {
	const [sidebarIsOpen, setIsSidebarOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(defaultArticleState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(defaultArticleState.fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [selectedWidthContent, setSelectedWidthContent] = useState(defaultArticleState.contentWidth);

	const rootRef = useRef<HTMLDivElement>(null);
	let lastStyles = useRef(defaultArticleState);

	useOutsideClickClose({
		isOpen: sidebarIsOpen,
		rootRef: rootRef,
		onClose: () => {
			setSelectedFont(lastStyles.current.fontFamilyOption)
			setSelectedFontSize(lastStyles.current.fontSizeOption)
			setSelectedFontColor(lastStyles.current.fontColor)
			setSelectedBackgroundColor(lastStyles.current.backgroundColor)
			setSelectedWidthContent(lastStyles.current.contentWidth)
		},
		onChange: setIsSidebarOpen,
	});

	const toggleSidebar = () => {
		// Вызов функции для изменения состояния
		setIsSidebarOpen(!sidebarIsOpen);
	}

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		lastStyles.current = {
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedWidthContent,
			fontSizeOption: selectedFontSize,
		};

		if (onChange) {
			onChange(lastStyles.current)
		}
	}

	const resetHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSelectedFontColor(defaultArticleState.fontColor)
		setSelectedFont(defaultArticleState.fontFamilyOption)
		setSelectedFontSize(defaultArticleState.fontSizeOption)
		setSelectedBackgroundColor(defaultArticleState.backgroundColor)
		setSelectedWidthContent(defaultArticleState.contentWidth)
		if (onChange) {
			onChange(defaultArticleState)
		}
	}

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleSidebar} />
			<aside className={`${styles.container} ${sidebarIsOpen ? styles.container_open : ''}`}>

				<form className={styles.form} onSubmit={submitHandler} onReset={resetHandler} >

					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>

					<Spacer />

					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>

					<Spacer />

					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Spacer />

					<Separator />
					<Spacer />

					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Spacer />

					<Select
						selected={selectedWidthContent}
						onChange={setSelectedWidthContent}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
