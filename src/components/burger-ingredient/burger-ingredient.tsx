import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
// Импорт хука и экшена для работы с Redux
import { useAppDispatch } from '../../services/hooks';
import { addIngredient } from '../../services/slices/burger-constructor-slice';

// Компонент для отображения одного ингредиента
// Ре-рендер только при изменении пропсов
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    // Текущий location
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Обработчик добавления ингредиента в конструктор
    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
