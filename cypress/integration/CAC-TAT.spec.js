/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function () {
        const TextLong = 'texto, texto, texto, texto, texto, texto'

        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Sagas')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(TextLong, { delay: 0 })
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })
    it('Exibir mensagem de erro com e-mail inválido', function () {

        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Sagas')
        cy.get('#email').type('teste@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')

    })
    it('Campo telefone deve ficar sem informação', function () {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')
    })
    it('Exibir mensagem de erro quando não preenchido o campo telefone que é obrigatório', function () {
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Sagas')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('.button').click()
    
        cy.get('.error').should('be.visible')
    
    })
    it ('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Mateus').should('have.value', 'Mateus').clear('#firstName').should('have.value', '')
        cy.get('#lastName').type('Sagas').should('have.value', 'Sagas').clear('#lastName').should('have.value', '')
        cy.get('#email').type('teste@gmail.com').should('have.value', 'teste@gmail.com').clear('#email').should('have.value', '')
        cy.get('#phone').type('0000000').should('have.value', '0000000').clear('#phone').should('have.value', '')
    })
    it ('Exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', function () {
        cy.get('.button').click()
        
        cy.get('.error').should('be.visible')

    })
    it ('Enviar o formuário com sucesso usando um comando customizado', function () {
        cy.ComandoTeste ()
        
        cy.get('.success').should('be.visible')
    })
    it('Clicar no botão Enviar, usando contains', function () {
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Sagas')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

    })
    it('Seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get(':nth-child(4) > input').check().should('have.value','feedback')
    })
    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    
    })
    it('Marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
        .as('selecionados').check().should('be.checked')
        cy.get('@selecionados').last().uncheck()
        .should('not.be.checked')
    })
    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json').should(function ($upload) {
            expect($upload[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo simulando um drag-drop', function () {
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).should(function ($upload) {
            expect($upload[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('exemplo')
        cy.get('input[type="file"]').selectFile('@exemplo').should(function ($upload) {
            expect($upload[0].files[0].name).to.equal('example.json')
        })
    })
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })
})