import { CSSProperties, useEffect, useRef, useState } from 'react';
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
	const paramsRef = useRef<HTMLElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', (e) => {
			if (
				!(paramsRef.current && paramsRef.current.contains(e.target as Node))
			) {
				setIsOpen(false);
				console.log('+');
			}
		});
	}, []);

	return (
		<main
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
				formRef={paramsRef}
				state={appState}
				isOpen={isOpen}
				setIsOpen={() => setIsOpen((prev) => !prev)}
				applyStyle={setAppState}
			/>
			<Article />
		</main>
	);
};
