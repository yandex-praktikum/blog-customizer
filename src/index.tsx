import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние страницы
	const [statePage, setStatePage] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': statePage.fontFamilyOption.value,
					'--font-size': statePage.fontSizeOption.value,
					'--font-color': statePage.fontColor.value,
					'--container-width': statePage.contentWidth.value,
					'--bg-color': statePage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={statePage}
				onChange={(state: ArticleStateType) => {
					setStatePage(state);
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
