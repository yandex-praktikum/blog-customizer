import { useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';

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
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	stateForm: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ stateForm }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] = useState<ArticleStateType>(defaultArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState((prev) => ({ ...prev, [key]: value }));
	};

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
		event: 'mousedown',
	});

	return (
		<>
			<ArrowButton onClick={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
			<div ref={rootRef} className={clsx(styles.container__width)}>
				<aside className={clsx(styles.container, isMenuOpen && styles.container_open)}>
					<form
						className={clsx(styles.form, isMenuOpen && styles.container_relative)}
						onSubmit={(e) => {
							e.preventDefault();
							stateForm(selectArticleState);
						}}
						onReset={(e) => {
							e.preventDefault();
							stateForm(defaultArticleState);
						}}>
						<Text weight={800} uppercase as="h3" size={31}>
							Задайте параметры
						</Text>
						<Select
							title="Шрифт"
							selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
						<RadioGroup
							title="Размер шрифта"
							name="Размер шрифта"
							selected={selectArticleState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) => handleChange('fontSizeOption', option)}
						/>
						<Select
							title="Цвет шрифта"
							selected={selectArticleState.fontColor}
							options={fontColors}
							onChange={(option) => handleChange('fontColor', option)}
						/>
						<Separator />
						<Select
							title="Цвет фона"
							selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
						<Select
							title="Ширина контента"
							selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleChange('contentWidth', option)}
						/>
						<div className={styles.bottomContainer}>
							<Button title="Сбросить" type="reset" />
							<Button title="Применить" type="submit" />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
