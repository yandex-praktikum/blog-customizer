import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  fontSizeOptions,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import type { FormEvent, MouseEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  settings: ArticleStateType;
  defaultSettings: ArticleStateType;
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const { settings, defaultSettings, onApply } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ArticleStateType>(settings);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(draft);
  };

  const handleReset = (): void => {
    setDraft(defaultSettings);
    onApply(defaultSettings);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select
            title="Шрифт"
            selected={draft.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setDraft((prev) => ({ ...prev, fontFamilyOption: option }))
            }
          />

          <Select
            title="Цвет текста"
            selected={draft.fontColor}
            options={fontColors}
            onChange={(option) => setDraft((prev) => ({ ...prev, fontColor: option }))}
          />

          <Select
            title="Цвет фона"
            selected={draft.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setDraft((prev) => ({ ...prev, backgroundColor: option }))
            }
          />

          <Select
            title="Размер шрифта"
            selected={draft.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option) =>
              setDraft((prev) => ({ ...prev, fontSizeOption: option }))
            }
          />

          <RadioGroup
            name="contentWidth"
            title="Ширина контента"
            selected={draft.contentWidth}
            options={contentWidthArr}
            onChange={(option) =>
              setDraft((prev) => ({ ...prev, contentWidth: option }))
            }
          />

          <Separator />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
