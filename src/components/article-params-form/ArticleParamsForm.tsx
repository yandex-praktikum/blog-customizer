import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	state: ArticleStateType;
	onSubmit?: (newState: ArticleStateType) => void;
	onReset?: () => void;
};

type ArticleParamsState = {
	isOpen: boolean;
} & ArticleStateType;

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [state, setState] = useState<ArticleParamsState>({
		...props.state,
		isOpen: false,
	});

	const onArrowClick = () => {
		setState((oldState) => {
			return { ...oldState, isOpen: !oldState.isOpen };
		});
	};

	const onFontFamilySelected = (newFamily: OptionType) =>
		setState((oldState) => {
			return { ...oldState, fontFamilyOption: newFamily };
		});

	const onFontSizeSelected = (newSize: OptionType) =>
		setState((oldState) => {
			return { ...oldState, fontSizeOption: newSize };
		});

	const onFontColorSelected = (newColor: OptionType) =>
		setState((oldState) => {
			return { ...oldState, fontColor: newColor };
		});

	const onBackgroundColorSelected = (newColor: OptionType) =>
		setState((oldState) => {
			return { ...oldState, backgroundColor: newColor };
		});

	const onContentWidthSelected = (newWidth: OptionType) =>
		setState((oldState) => {
			return { ...oldState, contentWidth: newWidth };
		});

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setState({ ...state, isOpen: false });
		if (props.onSubmit) {
			props.onSubmit({ ...state });
		}
	};

	const onReset = () => {
		setState({ ...defaultArticleState, isOpen: false });
		if (props.onReset) {
			props.onReset();
		}
	};

	return (
		<>
			<ArrowButton isOpen={state.isOpen} onClick={onArrowClick} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: state.isOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as={'h2'} uppercase weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						title='Шрифт'
						onChange={onFontFamilySelected}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='Размер шрифта'
						name='fontsize'
						onChange={onFontSizeSelected}
					/>
					<Select
						options={fontColors}
						selected={state.fontColor}
						title='Цвет шрифта'
						onChange={onFontColorSelected}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						title='Цвет фона'
						onChange={onBackgroundColorSelected}
					/>
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						title='Ширина контента'
						onChange={onContentWidthSelected}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
