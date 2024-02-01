import { useEffect } from 'react';

type UseEnterSubmit = {
	onChange: (isOpen: any) => void;
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
				onChange((isOpen: boolean) => !isOpen);
			}
		};
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, []);
};
