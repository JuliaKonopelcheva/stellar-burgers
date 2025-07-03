/// <reference types="cypress" />

Cypress.Commands.add('drag', (target: string) => {
  return cy.get(target).trigger('mousedown', { button: 0 })
    .trigger('mousemove', { clientX: 100, clientY: 100 })
    .trigger('mouseup');
});