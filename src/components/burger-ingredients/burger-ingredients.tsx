import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useAppSelector } from '../../services/hooks';
import { selectIngredients } from '../../services/slices/ingredients-slice';

export const BurgerIngredients: FC = () => {
  // Переменные из стора
  const items = useAppSelector(selectIngredients);

  // Оптимизация фильтрации с помощью useMemo
  const buns = useMemo(
    () => items.filter((item) => item.type === 'bun'),
    [items]
  );
  const mains = useMemo(
    () => items.filter((item) => item.type === 'main'),
    [items]
  );
  const sauces = useMemo(
    () => items.filter((item) => item.type === 'sauce'),
    [items]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0.5
  });

  const [mainsRef, inViewMains] = useInView({
    threshold: 0.5
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewMains) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    switch (tab) {
      case 'bun':
        titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
