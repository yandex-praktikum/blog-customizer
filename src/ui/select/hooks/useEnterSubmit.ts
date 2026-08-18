import { useEffect } from 'react';

import type * as React from 'react';

type UseEnterSubmit = {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  placeholderRef: React.RefObject<HTMLDivElement | null>;
};

export const useEnterSubmit = ({ placeholderRef, onChange }: UseEnterSubmit): void => {
  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        onChange((isOpen: boolean) => !isOpen);
      }
    };
    placeholderEl.addEventListener('keydown', handleEnterKeyDown);

    return (): void => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);
};
