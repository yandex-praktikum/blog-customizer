import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, TAppState } from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [appState, setAppState] = useState<TAppState>({
		currentStyle: defaultArticleState,
		setState: (state) => setAppState({ ...appState, currentStyle: state }),
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.currentStyle.fontFamilyOption.value,
					'--font-size': appState.currentStyle.fontSizeOption.value,
					'--font-color': appState.currentStyle.fontColor.value,
					'--container-width': appState.currentStyle.contentWidth.value,
					'--bg-color': appState.currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentStyle={appState.currentStyle}
				setState={appState.setState}
			/>
			<Article />
		</main>
	);
};
