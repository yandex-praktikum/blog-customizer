import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Text } from '../text';
import { Select } from '../select';
import {
	ArticleStateType,
	fontSizeOptions,
	contentWidthArr,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type TArticleParamsForm = {
	articleState: ArticleStateType;
	onSubmitState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onSubmitState,
}: TArticleParamsForm) => {
	const [isOpenForm, setOpenForm] = useState<boolean>(false);
	const [isOptionForm, setOptionForm] =
		useState<ArticleStateType>(articleState);
	const formRef = useRef<HTMLDivElement | null>(null);

	const onSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmitState(isOptionForm);
	};

	useOutsideClickClose({
		rootRef: formRef,
		isOpen: isOpenForm,
		onChange: () => setOpenForm(false),
	});

	const onChangeSelected = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setOptionForm((prev) => ({ ...prev, [key]: option }));
	};

	return (
		<div ref={formRef}>
			<ArrowButton onClick={setOpenForm} isOpenForm={isOpenForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenForm,
				})}>
				<form className={styles.form} onSubmit={onSubmitForm}>
					<Text weight={800} size={31} align={'left'} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={isOptionForm.fontFamilyOption}
						onChange={(isOptionForm) => {
							onChangeSelected('fontFamilyOption', isOptionForm);
						}}
					/>

					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={isOptionForm.fontSizeOption}
						name={'font-size'}
						onChange={(isOptionForm) => {
							onChangeSelected('fontSizeOption', isOptionForm);
						}}
					/>

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={isOptionForm.fontColor}
						onChange={(isOptionForm) => {
							onChangeSelected('fontColor', isOptionForm);
						}}
					/>

					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={isOptionForm.backgroundColor}
						onChange={(isOptionForm) => {
							onChangeSelected('backgroundColor', isOptionForm);
						}}
					/>

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={isOptionForm.contentWidth}
						onChange={(isOptionForm) => {
							onChangeSelected('contentWidth', isOptionForm);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setOptionForm(defaultArticleState);
								onSubmitState(defaultArticleState);
							}}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
