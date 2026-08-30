import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [appState, setAppState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			onClick={() => {}}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				state={appState}
				isOpen={isOpen}
				setIsOpen={() => setIsOpen((prev) => !prev)}
				onApply={setAppState}
				onReset={() => setAppState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};
