// Enhanced for readability and maintainability
import { useEffect } from 'react';

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	event?: 'click' | 'mousedown';
};

export const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
	event = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isMenuOpen) return;
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isMenuOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener(event, handleClick);

		return () => {
			window.removeEventListener(event, handleClick);
		};
	}, [onClose, onChange, isMenuOpen]);
};
