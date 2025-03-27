import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

import { 
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr
} from 'src/constants/articleProps';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

type ArticleParamsFormProps = {
  currentStyles: ArticleStateType;
  onApply: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  currentStyles,
  onApply
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(currentStyles);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setFormState(currentStyles);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      <aside 
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`} 
        ref={formRef}
      >
        <form 
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleApply();
          }}
          onReset={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          
          <Select
            selected={formState.fontFamilyOption}
            onChange={(option) => setFormState({...formState, fontFamilyOption: option})}
            options={fontFamilyOptions}
            title="Шрифт"
          />
          
          <Separator />
          
          <RadioGroup
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({...formState, fontSizeOption: option})}
            options={fontSizeOptions}
            name="font-size"
            title="Размер шрифта"
          />
          
          <Separator />
          
          <Select
            selected={formState.fontColor}
            onChange={(option) => setFormState({...formState, fontColor: option})}
            options={fontColors}
            title="Цвет шрифта"
          />
          
          <Separator />
          
          <Select
            selected={formState.backgroundColor}
            onChange={(option) => setFormState({...formState, backgroundColor: option})}
            options={backgroundColors}
            title="Цвет фона"
          />
          
          <Separator />
          
          <Select
            selected={formState.contentWidth}
            onChange={(option) => setFormState({...formState, contentWidth: option})}
            options={contentWidthArr}
            title="Ширина контента"
          />
          
          <div className={styles.bottomContainer}>
            <Button 
              title="Сбросить" 
              type="clear" 
              htmlType="reset"
              onClick={(e) => handleReset(e)}
            />
            <Button 
              title="Применить" 
              type="apply" 
              htmlType="submit"
              onClick={(e) => handleApply(e)}
            />
          </div>
        </form>
      </aside>
    </>
  );
};