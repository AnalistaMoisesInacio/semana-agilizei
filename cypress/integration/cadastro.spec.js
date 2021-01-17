/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance()

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        cy.visit('Register.html');

        //Routes
        cy.server()
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' )
           .as('getNewTable')
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**') 
           .as('postNewTable')
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' )
           .as('postUserTable')

       //Types
       // Usar o ^ para pegar o início da palavra
       // Usar o $ para pegar o final da palavra
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[ng-model^=Last]').type(chance.last())
        cy.get('textarea[ng-model="Adress"]').type(chance.word('alpha: true, length: 10'))
        cy.get('input[ng-model^=Email]').type(chance.email())
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false }))

        //Radio´s e Checkboxes
        cy.get('input[value="Male"]').check()
        cy.get('input[type="checkbox"]').check('Cricket')
        cy.get('input[type="checkbox"]').check('Hockey')
        
        //Select´s
        //cy.get('select#msdd').select('')
        cy.get('select#Skills').select('Javascript')
        cy.get('select#countries').select('Argentina')
        cy.get('select#country').select('Australia', {force: true})
        cy.get('select#yearbox').select('1990')
        cy.get('select[placeholder="Month"]').select('May')
        cy.get('select#daybox').select('22')

        cy.get('input#firstpassword').type('Teste01@@@@')
        cy.get('input#secondpassword').type('Teste01@@@@')
        
        cy.get('input#imagesrc').attachFile('teste001.jpg')
        cy.get('button#submitbtn').click()

        cy.wait('@getNewTable').then((resGetNewTable) => {
            cy.log(resGetNewTable.status)
              expect(resGetNewTable.status).to.equal(200)
        })

        cy.wait('@postNewTable').then((resPotNewTable) => {
            expect(resPotNewTable.status).to.equal(200)
        })

        cy.wait('@postUserTable').then((resPostUserTable) => {
            expect(resPostUserTable.status).to.equal(200)
        })

        cy.url().should('contain', 'WebTable')
    });
});