import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  fetchProfileOrders,
  selectProfileOrders,
  selectProfileOrdersLoading,
  selectProfileOrdersError
} from '../../services/slices/profile-orders-slice';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';

export const ProfileOrders: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectProfileOrders);
  const loading = useAppSelector(selectProfileOrdersLoading);
  const error = useAppSelector(selectProfileOrdersError);
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsLoaded = ingredients.length > 0;

  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchProfileOrders());
  }, [dispatch, ingredientsLoaded]);

  if (error) {
    return (
      <div className='text text_type_main-large mt-10'>
        Ошибка загрузки заказов
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} loading={loading} />;
};
