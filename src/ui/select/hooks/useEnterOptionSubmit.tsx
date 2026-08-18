import { useEffect } from 'react';

import type { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
  onClick: (value: OptionType['value']) => void;
  value: OptionType['value'];
  optionRef: React.RefObject<HTMLLIElement | null>;
};

export const useEnterOptionSubmit = ({
  onClick,
  value,
  optionRef,
}: UseEnterOptionSubmit): void => {
  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value);
      }
    };

    option.addEventListener('keydown', handleEnterKeyDown);
    return (): void => {
      option.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [value, onClick, optionRef]);
};
