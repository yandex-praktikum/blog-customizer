import { useEffect } from 'react';

type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
	placeholderRef: React.RefObject<HTMLDivElement>;
};

export const useEnterSubmit = ({
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	useEffect(() => {
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onChange((isMenuOpen: boolean) => !isMenuOpen);
			}
		};
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, []);
};
