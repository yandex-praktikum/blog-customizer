import { useEffect } from 'react';

type TUseClose = {
	isMenuOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export function useClose({ isMenuOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isMenuOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen, onClose, rootRef]);
}
