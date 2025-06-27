import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchFeedOrders } from '../../services/slices/feed-slice';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

export const Feed: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.feed);
  const ingredientsLoaded = useAppSelector(
    (state) => state.ingredients.items.length > 0
  );

  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchFeedOrders());
  }, [dispatch, ingredientsLoaded]);

  if (loading) {
    return <Preloader />;
  }
  if (error) {
    return (
      <div className='text text_type_main-large mt-10'>
        Ошибка загрузки ленты заказов
      </div>
    );
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedOrders())}
    />
  );
};
