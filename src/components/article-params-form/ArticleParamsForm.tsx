import { useState, useRef, useEffect } from 'react';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
	IPropsSettings,
} from '../../constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	articleState,
	onChange,
}: IPropsSettings) => {
	// Cостояние списка
	const [activeListSettings, setActiveListSettings] = useState(false);
	// Состояние формы
	const [activeSettingsForm, setActiveSettingsForm] = useState(articleState);

	// Открыть/закрыть настройки
	const toggleList = () => {
		if (activeListSettings) {
			setActiveListSettings(false);
		} else {
			setActiveListSettings(true);
		}
	};

	// Закрыть настройки по кнопке "Esc" и клику вне окна
	const asideRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const pressСlickOutside = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				toggleList();
			}
		};

		const pressEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveListSettings(false);
			}
		};

		if (!activeListSettings) return;
		if (activeListSettings) {
			window.addEventListener('mousedown', pressСlickOutside);
			window.addEventListener('keydown', pressEscapeKey);
		}
		return () => {
			window.removeEventListener('mousedown', pressСlickOutside);
			window.removeEventListener('keydown', pressEscapeKey);
		};
	}, [activeListSettings]);

	// Изменение полей в массиве настроек
	const handleCange = (field: keyof ArticleStateType, value: OptionType) => {
		setActiveSettingsForm({ ...activeSettingsForm, [field]: value });
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange(activeSettingsForm);
	};

	// Сброс настроек в первоначальное состояние
	const handleResetForm = () => {
		setActiveSettingsForm(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={activeListSettings} onClick={toggleList} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: activeListSettings,
				})}
				onSubmit={handleFormSubmit}
				onReset={handleResetForm}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={activeSettingsForm.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(selected) => {
							handleCange('fontFamilyOption', selected);
						}}></Select>

					<RadioGroup
						name={'--font-size'}
						options={fontSizeOptions}
						selected={activeSettingsForm.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(selected) => {
							handleCange('fontSizeOption', selected);
						}}></RadioGroup>

					<Select
						selected={activeSettingsForm.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(selected) => {
							handleCange('fontColor', selected);
						}}></Select>

					<Separator />

					<Select
						selected={activeSettingsForm.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(selected) => {
							handleCange('backgroundColor', selected);
						}}></Select>

					<Select
						selected={activeSettingsForm.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(selected) => {
							handleCange('contentWidth', selected);
						}}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
