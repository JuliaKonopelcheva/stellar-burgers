import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

// Тип состояния слайса ингредиентов
interface IIngredientsState {
  items: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

// Начальное состояние слайса ингредиентов
const initialState: IIngredientsState = {
  items: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

// Асинхронный thunk для получения ингредиентов с сервера
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

// Слайс для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Запрос ингредиентов начался
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    });
    // Запрос ингредиентов успешно завершён
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
      state.ingredientsRequest = false;
    });
    // Запрос ингредиентов завершился ошибкой
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
    });
  }
});

// Экспорт редьюсера
export default ingredientsSlice.reducer;
