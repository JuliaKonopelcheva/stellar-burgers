import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { RootState } from '../store';

// Интерфейс для пользователя
interface IUser {
  email: string;
  name: string;
}

// Интерфейс состояния авторизации
interface IAuthState {
  user: IUser | null;
  isAuthChecked: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
}

// Начальное состояние
export const initialState: IAuthState = {
  user: null,
  isAuthChecked: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  updateUserRequest: false,
  updateUserFailed: false
};

// Асинхронный action для проверки токена и получения данных пользователя
export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

// Асинхронный action для входа
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const response = await loginUserApi(data);
    return response.user;
  }
);

// Асинхронный action для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(data);
    return response.user;
  }
);

// Асинхронный action для обновления пользователя
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: { name?: string; email?: string; password?: string }) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

// Слайс для авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Очистка данных пользователя при выходе
    logout: (state) => {
      state.user = null;
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    // Обработка проверки авторизации
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      // Обработка входа
      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
        state.loginFailed = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginRequest = false;
        state.loginFailed = true;
      })
      // Обработка регистрации
      .addCase(registerUser.pending, (state) => {
        state.registerRequest = true;
        state.registerFailed = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerRequest = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerRequest = false;
        state.registerFailed = true;
      })
      // Обработка обновления пользователя
      .addCase(updateUser.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserFailed = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserRequest = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateUserRequest = false;
        state.updateUserFailed = true;
      });
  }
});

// Селекторы
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectLoginRequest = (state: RootState) => state.auth.loginRequest;
export const selectLoginFailed = (state: RootState) => state.auth.loginFailed;
export const selectRegisterRequest = (state: RootState) =>
  state.auth.registerRequest;
export const selectRegisterFailed = (state: RootState) =>
  state.auth.registerFailed;
export const selectUpdateUserRequest = (state: RootState) =>
  state.auth.updateUserRequest;
export const selectUpdateUserFailed = (state: RootState) =>
  state.auth.updateUserFailed;

// Экспорт actions и reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
