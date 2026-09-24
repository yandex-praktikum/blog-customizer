import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  type ArticleStateType,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setIsOpen((currentState) => !currentState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target;

      if (target instanceof Node && !panelRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    if (!isOpen) {
      return;
    }

    window.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleFontFamilyChange = (selectedOption: OptionType): void => {
    setFormState((currentState) => ({
      ...currentState,
      fontFamilyOption: selectedOption,
    }));
  };

  const handleFontSizeChange = (selectedOption: OptionType): void => {
    setFormState((currentState) => ({
      ...currentState,
      fontSizeOption: selectedOption,
    }));
  };

  const handleFontColorChange = (selectedOption: OptionType): void => {
    setFormState((currentState) => ({
      ...currentState,
      fontColor: selectedOption,
    }));
  };

  const handleBackgroundColorChange = (selectedOption: OptionType): void => {
    setFormState((currentState) => ({
      ...currentState,
      backgroundColor: selectedOption,
    }));
  };

  const handleContentWidthChange = (selectedOption: OptionType): void => {
    setFormState((currentState) => ({
      ...currentState,
      contentWidth: selectedOption,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={panelRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleFontFamilyChange}
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={handleFontSizeChange}
          />
          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleFontColorChange}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleBackgroundColorChange}
          />
          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleContentWidthChange}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
