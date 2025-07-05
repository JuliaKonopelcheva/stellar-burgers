// Тесты для rootReducer и конфигурации store
import { store } from './store';

describe('Store Configuration', () => {
  it('should return initial state for unknown action', () => {
    const initialState = store.getState();

    // Проверка начилия слайсов
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('feed');
  });

  it('should handle unknown action without errors', () => {
    const initialState = store.getState();

    // Отправка экшена, которого нет в редьюсере
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const newState = store.getState();

    // Состояние должно остаться неизменным
    expect(newState).toEqual(initialState);
  });
});
