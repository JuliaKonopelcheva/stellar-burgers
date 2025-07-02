import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import {
  selectIngredientsRequest,
  selectIngredientsFailed
} from '../../services/slices/ingredients-slice';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const ingredientsRequest = useAppSelector(selectIngredientsRequest);
  const ingredientsFailed = useAppSelector(selectIngredientsFailed);

  // Загрузка ингредиентов при первом рендере
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (ingredientsRequest) {
    return <Preloader />;
  }

  if (ingredientsFailed) {
    return (
      <div className='text text_type_main-large mt-10'>
        Ошибка загрузки ингредиентов
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        {/* Компонент со списком ингредиентов */}
        <BurgerIngredients />
        {/* Компонент конструктора бургера */}
        <BurgerConstructor />
      </div>
    </main>
  );
};
