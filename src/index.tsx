import { createRoot } from 'react-dom/client';
import { CSSProperties } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArticleStateType } from './constants/articleProps';


import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)

	return (
		<div
			className={clsx(styles.main)}
			style={{
				'--font-family': articleState.fontFamilyOption.value,
				'--font-size': articleState.fontSizeOption.value,
				'--font-color': articleState.fontColor.value,
				'--container-width': articleState.contentWidth.value,
				'--bg-color': articleState.backgroundColor.value,
			} as CSSProperties}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</div>
	);
};

root.render(
	<>
		<App />
	</>
);
