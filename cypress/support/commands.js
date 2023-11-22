Cypress.Commands.add ('ComandoTeste', function () {
    cy.get('#firstName').type('Mateus')
    cy.get('#lastName').type('Sagas')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('.button').click()

})