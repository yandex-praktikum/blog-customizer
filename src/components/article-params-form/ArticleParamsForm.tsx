import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import Spacing from '../spacing/Spacing';

interface ArticleParamsFormProps {
	onApplyParams: (paramsText: typeof defaultArticleState) => void;
	onResetParams: () => void;
	fontFamilyOptions: OptionType[];
	fontSizeOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApplyParams,
	onResetParams,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
}) => {
	const [params, setParams] = useState(defaultArticleState);
	const [isVisible, setIsVisible] = useState(true);
	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleVisible = () => {
		setIsVisible((prev) => !prev);
	};

	const onChangeHandler =
		(key: keyof typeof defaultArticleState) => (selectedOption: OptionType) => {
			setParams((prevParams) => ({
				...prevParams,
				[key]: selectedOption,
			}));
		};

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onApplyParams(params);
		setIsVisible(false);
	};

	const onResetHandler = () => {
		setParams(defaultArticleState);
		onResetParams();
		setIsVisible(false);
	};

	const closeHandler = (e: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(e.target as Node)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		if (isVisible) {
			document.addEventListener('mousedown', closeHandler);
		} else {
			document.removeEventListener('mousedown', closeHandler);
		}

		return () => {
			document.removeEventListener('mousedown', closeHandler);
		};
	}, [isVisible]);

	return (
		<>
			<ArrowButton isVisible={isVisible} onClick={toggleVisible} />
			<aside
				className={`${styles.container} ${
					isVisible ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={onSubmitHandler} ref={formRef}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Spacing size='large' />
					<Select
						title='Шрифт'
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChangeHandler('fontFamilyOption')}
					/>
					<Spacing size='large' />
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={onChangeHandler('fontSizeOption')}
					/>
					<Spacing size='large' />
					<Select
						title='Цвет шрифта'
						selected={params.fontColor}
						options={fontColors}
						onChange={onChangeHandler('fontColor')}
					/>
					<Spacing size='large' />
					<Separator />
					<Spacing size='large' />
					<Select
						title='Цвет фона'
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={onChangeHandler('backgroundColor')}
					/>
					<Spacing size='large' />
					<Select
						title='Ширина контента'
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={onChangeHandler('contentWidth')}
					/>
					<Spacing size='large' />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onResetHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
