// Тесты для burger-constructor-slice: добавление, удаление, перемещение ингредиентов и очистка конструктора
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burger-constructor-slice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  price: 100,
  image: 'test-bun.png',
  image_mobile: 'test-bun-mobile.png',
  image_large: 'test-bun-large.png'
};

const mockMain: TIngredient = {
  _id: 'main-1',
  name: 'Test Main',
  type: 'main',
  proteins: 15,
  fat: 8,
  carbohydrates: 25,
  calories: 200,
  price: 150,
  image: 'test-main.png',
  image_mobile: 'test-main-mobile.png',
  image_large: 'test-main-large.png'
};

describe('Burger Constructor Slice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  // Проверка добавления булки в конструктор
  describe('addIngredient', () => {
    it('should add bun to constructor', () => {
      const action = addIngredient(mockBun);
      const newState = burgerConstructorReducer(initialState, action);
      expect(newState.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
      expect(newState.ingredients).toEqual([]);
    });

    // Проверка добавления начинки в конструктор
    it('should add main ingredient to constructor', () => {
      const action = addIngredient(mockMain);
      const newState = burgerConstructorReducer(initialState, action);
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual({
        ...mockMain,
        id: expect.any(String)
      });
    });

    // Проверка замены булки, если она уже есть
    it('should replace existing bun when adding new bun', () => {
      const stateWithBun = {
        bun: { ...mockBun, id: 'existing-id' } as TConstructorIngredient,
        ingredients: []
      };
      const newBun = { ...mockBun, _id: 'bun-2', name: 'New Bun' };
      const action = addIngredient(newBun);
      const newState = burgerConstructorReducer(stateWithBun, action);
      expect(newState.bun).toEqual({
        ...newBun,
        id: expect.any(String)
      });
      expect((newState.bun as TConstructorIngredient)?.id).not.toBe(
        'existing-id'
      );
    });
  });

  // Проверка удаления ингредиента по id
  describe('removeIngredient', () => {
    it('should remove ingredient by id', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'ingredient-1' } as TConstructorIngredient,
          { ...mockMain, id: 'ingredient-2' } as TConstructorIngredient
        ]
      };
      const action = removeIngredient('ingredient-1');
      const newState = burgerConstructorReducer(stateWithIngredients, action);
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0].id).toBe('ingredient-2');
    });

    // Проверка, что не удаляется несуществующий ингредиент
    it('should not remove ingredient if id does not exist', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'ingredient-1' } as TConstructorIngredient
        ]
      };
      const action = removeIngredient('non-existent-id');
      const newState = burgerConstructorReducer(stateWithIngredients, action);
      expect(newState.ingredients).toEqual(stateWithIngredients.ingredients);
    });
  });

  // Проверка перемещения ингредиента внутри конструктора
  describe('moveIngredient', () => {
    it('should move ingredient from one position to another', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'ingredient-1' } as TConstructorIngredient,
          { ...mockMain, id: 'ingredient-2' } as TConstructorIngredient,
          { ...mockMain, id: 'ingredient-3' } as TConstructorIngredient
        ]
      };
      const action = moveIngredient({ from: 0, to: 2 });
      const newState = burgerConstructorReducer(stateWithIngredients, action);
      expect(newState.ingredients[0].id).toBe('ingredient-2');
      expect(newState.ingredients[1].id).toBe('ingredient-3');
      expect(newState.ingredients[2].id).toBe('ingredient-1');
    });

    // Проверка, что при одном ингредиенте порядок не меняется
    it('should not move ingredient if only one ingredient exists', () => {
      const stateWithOneIngredient = {
        bun: null,
        ingredients: [
          { ...mockMain, id: 'ingredient-1' } as TConstructorIngredient
        ]
      };
      const action = moveIngredient({ from: 0, to: 0 });
      const newState = burgerConstructorReducer(stateWithOneIngredient, action);
      expect(newState.ingredients).toEqual(stateWithOneIngredient.ingredients);
    });
  });

  // Проверка очистки конструктора
  describe('clearConstructor', () => {
    it('should clear all ingredients and bun', () => {
      const stateWithIngredients = {
        bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
        ingredients: [
          { ...mockMain, id: 'ingredient-1' } as TConstructorIngredient
        ]
      };
      const action = clearConstructor();
      const newState = burgerConstructorReducer(stateWithIngredients, action);
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([]);
    });
  });
});
