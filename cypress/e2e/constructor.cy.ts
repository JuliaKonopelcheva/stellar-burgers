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
      cy.get('[data-testid="ingredient-bun"]').first().find('button').click();

      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-testid="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    // Проверка добавления начинки
    it('should add main ingredient to constructor', () => {
      cy.get('[data-testid="ingredient-main"]').first().find('button').click();
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
    });

    // Проверка добавления соуса
    it('should add sauce to constructor', () => {
      cy.get('[data-testid="ingredient-sauce"]').first().find('button').click();
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain',
        'Соус фирменный Space Sauce'
      );
    });
  });

  // Проверка работы модальных окон ингредиента
  describe('Modal windows', () => {
    // Открытие модального окна по клику на ингредиент
    it('should open ingredient modal when clicking on ingredient', () => {
      cy.get('[data-testid="ingredient-main"]').first().click();

      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal"]').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
    });

    // Закрытие модального окна по крестику
    it('should close ingredient modal when clicking on close button', () => {
      // Открытие модальное окно
      cy.get('[data-testid="ingredient-main"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');

      // Закрытие модального окна
      cy.get('[data-testid="modal-close"]').click();

      // Проверка, что модальное окно закрылось
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('should close ingredient modal when clicking on overlay', () => {
      // Открытие модальное окно
      cy.get('[data-testid="ingredient-main"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');

      // Закрытие модального окна кликом по оверлею
      cy.get('[data-testid="modal-overlay"]').click({ force: true });

      // Проверка, что модальное окно закрылось
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });

  // Проверка процесса оформления заказа
  describe('Order creation', () => {
    it('should create order successfully', () => {
      // Добавление булки
      cy.get('[data-testid="ingredient-bun"]').first().find('button').click();

      // Добавление начинки
      cy.get('[data-testid="ingredient-main"]').first().find('button').click();

      // Кнопка "Оформить заказ"
      cy.get('[data-testid="order-button"]').click();

      // Ждем создания заказа
      cy.wait('@createOrder');

      // Проверка, что модальное окно заказа открылось
      cy.get('[data-testid="order-modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('contain', '12345');

      // Закрытие модального окна
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="order-modal"]').should('not.exist');

      // Проверка, что конструктор очистился
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain',
        'Выберите начинку'
      );
      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
