import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/hooks';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/burger-constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    // Перемещение ингредиента вниз
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ from: index, to: index + 1 }));
      }
    };

    // Перемещение ингредиента вверх
    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ from: index, to: index - 1 }));
      }
    };

    // Удаление ингредиента
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
