// Селекторы
const SELECTOR_INGREDIENT_BUN = '[data-testid="ingredient-bun"]';
const SELECTOR_INGREDIENT_MAIN = '[data-testid="ingredient-main"]';
const SELECTOR_INGREDIENT_SAUCE = '[data-testid="ingredient-sauce"]';
const SELECTOR_CONSTRUCTOR_BUN_TOP = '[data-testid="constructor-bun-top"]';
const SELECTOR_CONSTRUCTOR_BUN_BOTTOM = '[data-testid="constructor-bun-bottom"]';
const SELECTOR_CONSTRUCTOR_INGREDIENTS = '[data-testid="constructor-ingredients"]';
const SELECTOR_MODAL = '[data-testid="modal"]';
const SELECTOR_MODAL_CLOSE = '[data-testid="modal-close"]';
const SELECTOR_MODAL_OVERLAY = '[data-testid="modal-overlay"]';
const SELECTOR_ORDER_BUTTON = '[data-testid="order-button"]';
const SELECTOR_ORDER_MODAL = '[data-testid="order-modal"]';
const SELECTOR_ORDER_NUMBER = '[data-testid="order-number"]';

describe('Constructor Page', () => {
  beforeEach(() => {
    // Перехват запросов к API
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавка токенов авторизации
    cy.setCookie('accessToken', 'test-access-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    // Открываем главную страницу и ждём загрузки ингредиентов
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очистка токенов после каждого теста
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  // Проверка добавления ингредиентов в конструктор
  describe('Adding ingredients to constructor', () => {
    it('should add bun to constructor', () => {
      // Проверка добавления булки
      cy.get(SELECTOR_INGREDIENT_BUN).first().find('button').click();

      cy.get(SELECTOR_CONSTRUCTOR_BUN_TOP).should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get(SELECTOR_CONSTRUCTOR_BUN_BOTTOM).should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    // Проверка добавления начинки
    it('should add main ingredient to constructor', () => {
      cy.get(SELECTOR_INGREDIENT_MAIN).first().find('button').click();
      cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
    });

    // Проверка добавления соуса
    it('should add sauce to constructor', () => {
      cy.get(SELECTOR_INGREDIENT_SAUCE).first().find('button').click();
      cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should(
        'contain',
        'Соус фирменный Space Sauce'
      );
    });
  });

  // Проверка работы модальных окон ингредиента
  describe('Modal windows', () => {
    // Открытие модального окна по клику на ингредиент
    it('should open ingredient modal when clicking on ingredient', () => {
      cy.get(SELECTOR_INGREDIENT_MAIN).first().click();

      cy.get(SELECTOR_MODAL).should('be.visible');
      cy.get(SELECTOR_MODAL).should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
    });

    // Закрытие модального окна по крестику
    it('should close ingredient modal when clicking on close button', () => {
      // Открытие модальное окно
      cy.get(SELECTOR_INGREDIENT_MAIN).first().click();
      cy.get(SELECTOR_MODAL).should('be.visible');

      // Закрытие модального окна
      cy.get(SELECTOR_MODAL_CLOSE).click();

      // Проверка, что модальное окно закрылось
      cy.get(SELECTOR_MODAL).should('not.exist');
    });

    it('should close ingredient modal when clicking on overlay', () => {
      // Открытие модальное окно
      cy.get(SELECTOR_INGREDIENT_MAIN).first().click();
      cy.get(SELECTOR_MODAL).should('be.visible');

      // Закрытие модального окна кликом по оверлею
      cy.get(SELECTOR_MODAL_OVERLAY).click({ force: true });

      // Проверка, что модальное окно закрылось
      cy.get(SELECTOR_MODAL).should('not.exist');
    });
  });

  // Проверка процесса оформления заказа
  describe('Order creation', () => {
    it('should create order successfully', () => {
      // Добавление булки
      cy.get(SELECTOR_INGREDIENT_BUN).first().find('button').click();

      // Добавление начинки
      cy.get(SELECTOR_INGREDIENT_MAIN).first().find('button').click();

      // Кнопка "Оформить заказ"
      cy.get(SELECTOR_ORDER_BUTTON).click();

      // Ждем создания заказа
      cy.wait('@createOrder');

      // Проверка, что модальное окно заказа открылось
      cy.get(SELECTOR_ORDER_MODAL).should('be.visible');
      cy.get(SELECTOR_ORDER_NUMBER).should('contain', '12345');

      // Закрытие модального окна
      cy.get(SELECTOR_MODAL_CLOSE).click();
      cy.get(SELECTOR_ORDER_MODAL).should('not.exist');

      // Проверка, что конструктор очистился
      cy.get(SELECTOR_CONSTRUCTOR_INGREDIENTS).should(
        'contain',
        'Выберите начинку'
      );
      cy.get(SELECTOR_CONSTRUCTOR_BUN_TOP).should('not.exist');
      cy.get(SELECTOR_CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
    });
  });
});
