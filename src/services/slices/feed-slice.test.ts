// Тесты для feed-slice: проверка асинхронных экшенов ленты заказов
import feedReducer, { fetchFeedOrders } from './feed-slice';
import { TOrder } from '../../utils/types';

describe('Feed Slice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: false,
    total: 0,
    totalToday: 0
  };

  // Проверка состояния ожидания ответа при загрузке ленты заказов
  it('should handle pending', () => {
    const action = { type: fetchFeedOrders.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  // Проверка успешной загрузки ленты заказов
  it('should handle fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        number: 1,
        status: 'done',
        name: 'Order',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      }
    ];
    const action = {
      type: fetchFeedOrders.fulfilled.type,
      payload: { orders: mockOrders, total: 10, totalToday: 2 }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  // Проверка запроса, завершенного с ошибкой при загрузке ленты заказов
  it('should handle rejected', () => {
    const action = { type: fetchFeedOrders.rejected.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });
});
