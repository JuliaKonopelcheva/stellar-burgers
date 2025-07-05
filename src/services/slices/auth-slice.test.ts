// Тесты для auth-slice: проверка авторизации и обновления пользователя
import authReducer, {
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser,
  logout,
  initialState
} from './auth-slice';

describe('Auth Slice', () => {
  // Проверка состояния при checkUserAuth
  it('should handle checkUserAuth pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const state = authReducer(initialState, action);
    expect(state.isAuthChecked).toBe(false);
  });

  // Проверка успешной авторизации
  it('should handle checkUserAuth fulfilled', () => {
    const user = { name: 'Test', email: 'test@test.com' };
    const action = { type: checkUserAuth.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  // Проверка запроса, завершенного с ошибкой при checkUserAuth
  it('should handle checkUserAuth rejected', () => {
    const action = { type: checkUserAuth.rejected.type };
    const state = authReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  // Проверка состояния ожидания ответа при loginUser
  it('should handle loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loginRequest).toBe(true);
    expect(state.loginFailed).toBe(false);
  });

  // Проверка успешного входа
  it('should handle loginUser fulfilled', () => {
    const user = { name: 'Test', email: 'test@test.com' };
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.loginRequest).toBe(false);
    expect(state.user).toEqual(user);
  });

  // Проверка запроса, завершенного с ошибкой при loginUser
  it('should handle loginUser rejected', () => {
    const action = { type: loginUser.rejected.type };
    const state = authReducer(initialState, action);
    expect(state.loginRequest).toBe(false);
    expect(state.loginFailed).toBe(true);
  });

  // Проверка состояния ожидания ответа при registerUser
  it('should handle registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.registerRequest).toBe(true);
    expect(state.registerFailed).toBe(false);
  });

  // Проверка успешной регистрации
  it('should handle registerUser fulfilled', () => {
    const user = { name: 'Test', email: 'test@test.com' };
    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.registerRequest).toBe(false);
    expect(state.user).toEqual(user);
  });

  // Проверка запроса, завершенного с ошибкой при registerUser
  it('should handle registerUser rejected', () => {
    const action = { type: registerUser.rejected.type };
    const state = authReducer(initialState, action);
    expect(state.registerRequest).toBe(false);
    expect(state.registerFailed).toBe(true);
  });

  // Проверка состояния ожидания ответа при updateUser
  it('should handle updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.updateUserRequest).toBe(true);
    expect(state.updateUserFailed).toBe(false);
  });

  // Проверка успешного обновления пользователя
  it('should handle updateUser fulfilled', () => {
    const user = { name: 'Test', email: 'test@test.com' };
    const action = { type: updateUser.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);
    expect(state.updateUserRequest).toBe(false);
    expect(state.user).toEqual(user);
  });

  // Проверка запроса, завершенного с ошибкой при updateUser
  it('should handle updateUser rejected', () => {
    const action = { type: updateUser.rejected.type };
    const state = authReducer(initialState, action);
    expect(state.updateUserRequest).toBe(false);
    expect(state.updateUserFailed).toBe(true);
  });

  // Проверка очистки пользователя через logout
  it('should handle logout', () => {
    const stateWithUser = {
      ...initialState,
      user: { name: 'Test', email: 'test@test.com' }
    };
    const state = authReducer(stateWithUser, logout());
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
