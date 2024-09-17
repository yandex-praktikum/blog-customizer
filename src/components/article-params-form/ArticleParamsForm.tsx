import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	return (
		<>
			<ArrowButton isOpen={false} onClick={() => {}} />
			<aside className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
