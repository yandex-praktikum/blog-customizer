import { useEffect, useRef } from 'react';

import type { OptionType } from 'src/constants/articleProps';

type UseEnterSubmit = {
  onChange?: (option: OptionType) => void;
  option: OptionType;
};

export const useEnterSubmit = ({ onChange, option }: UseEnterSubmit): void => {
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const optionHtml = optionRef.current;

    if (!optionHtml) return;

    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (document.activeElement === optionHtml && event.key === 'Enter') {
        onChange?.(option);
      }
    };

    optionHtml.addEventListener('keydown', handleEnterKeyDown);

    // не забываем удалять листенеры, при размонтировании компонента
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      optionHtml.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [onChange, option]);
};
