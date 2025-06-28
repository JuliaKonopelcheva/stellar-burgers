import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import ingredientsReducer from './slices/ingredients-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice';
import orderReducer from './slices/order-slice';
import profileOrdersReducer from './slices/profile-orders-slice';
import feedReducer from './slices/feed-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    profileOrders: profileOrdersReducer,
    feed: feedReducer
  },
  // Включение Redux DevTools в режиме разработки
  devTools: process.env.NODE_ENV !== 'production'
});

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
