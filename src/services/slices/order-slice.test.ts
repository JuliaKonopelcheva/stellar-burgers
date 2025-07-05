// Тесты для order-slice: проверка асинхронных экшенов и очистки заказа
import orderReducer, { createOrder, clearOrder } from './order-slice';
import { TOrder } from '../../utils/types';

describe('Order Slice', () => {
  const initialState = {
    orderRequest: false,
    orderFailed: false,
    order: null
  };

  // Проверка состояния ожидания ответа при создании заказа
  it('should handle pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderFailed).toBe(false);
  });

  // Проверка успешного создания заказа
  it('should handle fulfilled', () => {
    const mockOrder: TOrder = {
      _id: 'order-1',
      number: 123,
      status: 'done',
      name: 'Test Order',
      createdAt: '',
      updatedAt: '',
      ingredients: []
    };
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  // Проверка запроса, завершенного с ошибкой при создании заказа
  it('should handle rejected', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(true);
  });

  // Проверка очистки заказа через clearOrder
  it('should clear order', () => {
    const stateWithOrder = {
      ...initialState,
      order: { _id: 'order-1' } as TOrder
    };
    const state = orderReducer(stateWithOrder, clearOrder());
    expect(state.order).toBeNull();
  });
});
