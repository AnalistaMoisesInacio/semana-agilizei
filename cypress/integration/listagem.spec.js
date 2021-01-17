/// <reference types="cypress" />

context('Listagem', () => {
    
    it('Listagem com um registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-unico'
        } ).as('getNewTable')
        cy.visit('WebTable.html')
        cy.get('div[role=row] div[role=gridcell]')
          .eq(4)
          .find('div')
          .as('grideCellPhone')
        cy.get('@grideCellPhone').should('contain','2587165766')
    })

    it('Listagem sem registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response:'fx:webtable-get-vazio'
        } ).as('getNewTable')
        cy.visit('WebTable.html')  
        cy.get('div[role=row]').should('have.length',1)
    })
})