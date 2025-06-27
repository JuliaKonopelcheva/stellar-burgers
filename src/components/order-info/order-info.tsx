import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchFeedOrders } from '../../services/slices/feed-slice';
import { fetchProfileOrders } from '../../services/slices/profile-orders-slice';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();

  const feedOrders = useAppSelector((state) => state.feed.orders);
  const feedLoading = useAppSelector((state) => state.feed.loading);
  const feedError = useAppSelector((state) => state.feed.error);

  const profileOrders = useAppSelector((state) => state.profileOrders.orders);
  const profileLoading = useAppSelector((state) => state.profileOrders.loading);
  const profileError = useAppSelector((state) => state.profileOrders.error);

  const ingredients = useAppSelector((state) => state.ingredients.items);
  const ingredientsLoading = useAppSelector(
    (state) => state.ingredients.ingredientsRequest
  );
  const ingredientsError = useAppSelector(
    (state) => state.ingredients.ingredientsFailed
  );

  const isAuth = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (feedOrders.length === 0) {
      dispatch(fetchFeedOrders());
    }
    if (isAuth && profileOrders.length === 0) {
      dispatch(fetchProfileOrders());
    }
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [
    dispatch,
    feedOrders.length,
    profileOrders.length,
    ingredients.length,
    isAuth
  ]);

  const orderData = useMemo(() => {
    const num = Number(number);
    return (
      feedOrders.find((order) => order.number === num) ||
      profileOrders.find((order) => order.number === num)
    );
  }, [number, feedOrders, profileOrders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (feedLoading || profileLoading || ingredientsLoading) return <Preloader />;
  if (feedError || profileError || ingredientsError)
    return <div>Ошибка загрузки данных</div>;
  if (!orderData) return <div>Заказ не найден</div>;

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
