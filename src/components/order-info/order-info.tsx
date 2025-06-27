import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  // Заказы
  const feedOrders = useAppSelector((state) => state.feed.orders);
  const profileOrders = useAppSelector((state) => state.profileOrders.orders);
  // Ингридиенты
  const ingredients = useAppSelector((state) => state.ingredients.items);

  // Поиск заказа по номеру
  const orderData = useMemo(() => {
    const num = Number(number);
    return (
      feedOrders.find((order) => order.number === num) ||
      profileOrders.find((order) => order.number === num)
    );
  }, [number, feedOrders, profileOrders]);

  // Данные для отображения
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

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
