import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': defaultArticleState.fontFamilyOption.value,
          '--font-size': defaultArticleState.fontSizeOption.value,
          '--font-color': defaultArticleState.fontColor.value,
          '--container-width': defaultArticleState.contentWidth.value,
          '--bg-color': defaultArticleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm />
      <Article />
    </main>
  );
};
