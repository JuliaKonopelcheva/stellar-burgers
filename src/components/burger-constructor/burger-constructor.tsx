import { FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { createOrder, clearOrder } from '../../services/slices/order-slice';
import { clearConstructor } from '../../services/slices/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Состояние конструктора из Redux store
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  // Состояние заказа и авторизации
  const { orderRequest, order } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);

  // Обработчик клика по кнопке "Оформить заказ"
  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    // Если пользователь не авторизован, перенаправление на страницу входа
    if (!user) {
      navigate('/login');
      return;
    }

    // Массив ID ингредиентов для заказа
    const ingredientIds = [
      bun._id,
      ...(ingredients || []).map((item) => item._id),
      bun._id
    ];

    // Отправление заказа
    dispatch(createOrder(ingredientIds));
  };

  // Закрытие модального окна с заказом
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  // Подсчет общей стоимости заказа
  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  // Очищение конструктора после успешного заказа
  useEffect(() => {
    if (order) {
      dispatch(clearConstructor());
    }
  }, [order, dispatch]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients: ingredients || [] }}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
