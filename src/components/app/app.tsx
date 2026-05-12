import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
	const [appSettings, setAppSettings] = useState(defaultArticleState);

	const changeOptions = (newSettings: ArticleStateType) => {
		setAppSettings(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appSettings.fontFamilyOption.value,
					'--font-size': appSettings.fontSizeOption.value,
					'--font-color': appSettings.fontColor.value,
					'--container-width': appSettings.contentWidth.value,
					'--bg-color': appSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={changeOptions} />
			<Article />
		</main>
	);
};
