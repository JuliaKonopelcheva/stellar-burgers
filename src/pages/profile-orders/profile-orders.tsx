import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchProfileOrders } from '../../services/slices/profile-orders-slice';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

export const ProfileOrders: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(
    (state) => state.profileOrders
  );
  const inggredientsLoaded = useAppSelector(
    (state) => state.ingredients.items.length > 0
  );

  useEffect(() => {
    if (!inggredientsLoaded) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchProfileOrders());
  }, [dispatch, inggredientsLoaded]);

  if (error) {
    return (
      <div className='text text_type_main-large mt-10'>
        Ошибка загрузки заказов
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} loading={loading} />;
};
