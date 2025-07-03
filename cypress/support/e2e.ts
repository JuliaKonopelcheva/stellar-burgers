import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      drag(target: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
