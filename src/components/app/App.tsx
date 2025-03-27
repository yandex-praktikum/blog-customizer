import { useState } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import type { ArticleStateType } from 'src/constants/articleProps';
import type { CSSProperties } from 'react';

import 'src/styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
  const [currentStyles, setCurrentStyles] = useState<ArticleStateType>(defaultArticleState);

  const styleVariables = {
    '--font-family': currentStyles.fontFamilyOption.value,
    '--font-size': currentStyles.fontSizeOption.value,
    '--font-color': currentStyles.fontColor.value,
    '--container-width': currentStyles.contentWidth.value,
    '--bg-color': currentStyles.backgroundColor.value,
  } as CSSProperties;

  return (
    <main className={styles.main} style={styleVariables}>
      <ArticleParamsForm 
        currentStyles={currentStyles}
        onApply={(newStyles) => setCurrentStyles(newStyles)}
      />
      <Article />
    </main>
  );
};