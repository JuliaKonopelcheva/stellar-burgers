// Тесты для profile-orders-slice: проверка асинхронных экшенов заказов пользователя
import profileOrdersReducer, {
  fetchProfileOrders
} from './profile-orders-slice';
import { TOrder } from '../../utils/types';

describe('Profile Orders Slice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: false
  };

  // Проверка состояния ожидания ответа при загрузке заказов пользователя
  it('should handle pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  // Проверка успешной загрузки заказов пользователя
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
      type: fetchProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  // Проверка запроса, завершенного с ошибкой при загрузке заказов пользователя
  it('should handle rejected', () => {
    const action = { type: fetchProfileOrders.rejected.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });
});
