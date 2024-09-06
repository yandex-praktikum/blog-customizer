import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [paramsText, setParamsText] =
		useState<typeof defaultArticleState>(defaultArticleState);

	const applyParamsHandler = (newParamsText: typeof defaultArticleState) => {
		setParamsText(newParamsText);
	};

	const resetParamsHandler = () => {
		setParamsText(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': paramsText.fontFamilyOption.value,
					'--font-size': paramsText.fontSizeOption.value,
					'--font-color': paramsText.fontColor.value,
					'--container-width': paramsText.contentWidth.value,
					'--bg-color': paramsText.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApplyParams={applyParamsHandler}
				onResetParams={resetParamsHandler}
				fontFamilyOptions={fontFamilyOptions}
				fontSizeOptions={fontSizeOptions}
				fontColors={fontColors}
				backgroundColors={backgroundColors}
				contentWidthArr={contentWidthArr}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
