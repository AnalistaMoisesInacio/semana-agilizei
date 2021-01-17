/// <reference types="cypress" />

Given('que o site não possui registros', () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response:'fx:webtable-get-unico'
    } ).as('getNewTable')
});
	
When('acessar a listagem', () => {
    cy.visit('WebTable.html')  
});

Then('devo visualizar a listagem vazia', () => {
    cy.get('div[role=row]').should('have.length',1)
});


Then('devo visualizar varios  registros', () => {
	cy.get('div[role=row] div[role=gridcell]')
          .eq(4)
          .find('div')
          .as('grideCellPhone')
        cy.get('@grideCellPhone').should('contain','2587165766')
});