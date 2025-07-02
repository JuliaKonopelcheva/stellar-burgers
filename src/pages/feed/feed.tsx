import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  fetchFeedOrders,
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} from '../../services/slices/feed-slice';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';

export const Feed: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);
  const loading = useAppSelector(selectFeedLoading);
  const error = useAppSelector(selectFeedError);
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsLoaded = ingredients.length > 0;

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
