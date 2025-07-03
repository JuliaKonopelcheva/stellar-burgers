import '@testing-library/jest-dom';

// Мокаем IntersectionObserver для тестов
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Мокаем ResizeObserver для тестов
(global as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};