import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	TAppState,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = (props: TAppState) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState(props.currentStyle);

	function select(
		title: string,
		optionName: keyof ArticleStateType,
		optionList: OptionType[]
	) {
		const onchange = (e: OptionType) => {
			setState({
				...state,
				[optionName]: e,
			});
		};
		return (
			<Select
				title={title}
				selected={state[optionName]}
				options={optionList}
				onChange={onchange}
				{...props}
			/>
		);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>
			<aside className={isOpen ? styles.container_open : styles.container}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					{select('шрифт', 'fontFamilyOption', fontFamilyOptions)}
					<RadioGroup
						options={fontSizeOptions}
						name='fontSize'
						selected={state.fontSizeOption}
						key={0}
						onChange={(e) => {
							setState({
								...state,
								fontSizeOption: e,
							});
						}}
						title='размер шрифта'
					/>
					{select('цвет шрифта', 'fontColor', fontColors)}
					<Separator />
					{select('цвет фона', 'backgroundColor', backgroundColors)}
					{select('ширина контента', 'contentWidth', contentWidthArr)}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								props.setState(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								props.setState(state);
								setIsOpen(false);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
