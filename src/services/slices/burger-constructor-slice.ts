import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid'; // Для уникальных id ингредиентов

// Тип состояния конструктора бургера
interface IBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

// Начальное состояние конструктора
const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавление ингредиента
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        if (!state.ingredients) {
          state.ingredients = [];
        }
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    // Удаление ингредиента по id
    removeIngredient: (state, action: PayloadAction<string>) => {
      if (state.ingredients) {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    // Перемещение ингредиента
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      if (state.ingredients && state.ingredients.length > 1) {
        const { from, to } = action.payload;
        const items = [...state.ingredients];
        const [moved] = items.splice(from, 1);
        items.splice(to, 0, moved);
        state.ingredients = items;
      }
    },
    // Очистка конструктора (после успешного заказа)
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

// Экспорт экшенов и редьюсера
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
