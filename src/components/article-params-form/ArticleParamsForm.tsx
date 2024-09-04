import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisible = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<>
			<ArrowButton isVisible={isVisible} onClick={toggleVisible} />
			<aside
				className={`${styles.container} ${
					isVisible ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
