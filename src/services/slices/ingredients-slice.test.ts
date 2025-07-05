// Тесты для ingredients-slice: асинхронные экшены и обработка загрузки/ошибки
import ingredientsReducer, { fetchIngredients } from './ingredients-slice';
import { TIngredient } from '../../utils/types';

describe('Ingredients Slice', () => {
  const initialState = {
    items: [],
    ingredientsRequest: false,
    ingredientsFailed: false
  };

  // Проверка состояния ожидания ответа при загрузке ингредиентов
  describe('fetchIngredients', () => {
    it('should handle pending state', () => {
      const action = { type: fetchIngredients.pending.type };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.ingredientsRequest).toBe(true);
      expect(newState.ingredientsFailed).toBe(false);
    });

    // Проверка успешной загрузки ингредиентов
    it('should handle fulfilled state', () => {
      const mockIngredients: TIngredient[] = [
        {
          _id: 'ingredient-1',
          name: 'Test Ingredient 1',
          type: 'bun',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 150,
          price: 100,
          image: 'test-1.png',
          image_mobile: 'test-1-mobile.png',
          image_large: 'test-1-large.png'
        },
        {
          _id: 'ingredient-2',
          name: 'Test Ingredient 2',
          type: 'main',
          proteins: 15,
          fat: 8,
          carbohydrates: 25,
          calories: 200,
          price: 150,
          image: 'test-2.png',
          image_mobile: 'test-2-mobile.png',
          image_large: 'test-2-large.png'
        }
      ];
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.items).toEqual(mockIngredients);
      expect(newState.ingredientsRequest).toBe(false);
      expect(newState.ingredientsFailed).toBe(false);
    });

    // Проверка запроса, завершенного с ошибкой при загрузке ингредиентов
    it('should handle rejected state', () => {
      const action = { type: fetchIngredients.rejected.type };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.ingredientsRequest).toBe(false);
      expect(newState.ingredientsFailed).toBe(true);
    });
  });
});
