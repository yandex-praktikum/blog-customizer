import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useClose } from './hooks/useClose';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
		fontSize: articleState.fontSizeOption,
	});

	const rootRef = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	useClose({
		isMenuOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: formRef,
	});

	const formResetHandler = () => {
		setFormState((prevState) => ({
			...prevState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<>
			<ArrowButton onClick={setIsMenuOpen} isMenuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					ref={formRef}>
					<Text as={'h2'} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOptions) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOptions,
							}))
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						selected={formState.fontSize}
						options={fontSizeOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
