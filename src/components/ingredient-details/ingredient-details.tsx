import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  // Переменные из стора
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
