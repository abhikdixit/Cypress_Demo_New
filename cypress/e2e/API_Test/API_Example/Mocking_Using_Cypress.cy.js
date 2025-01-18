// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Mocking API/XHAR Calls using Cypress', function () {

    it("GET and PUT Request", function () {
        cy.visit('https://example.cypress.io/commands/network-requests')
        
        cy.server()
        // Listen to GET to comments/1
        cy.route('GET', 'comments/*').as('getComment')

        // we have code that gets a comment when
        // the button is clicked in scripts.js
        cy.get('.network-btn').click()

        // https://on.cypress.io/wait
        cy.wait('@getComment').its('status').should('eq', 200)

        // Listen to POST to comments
        cy.route('POST', '/comments').as('postComment')

        // we have code that posts a comment when
        // the button is clicked in scripts.js
        cy.get('.network-post').click()
        cy.wait('@postComment')

        // get the route
        cy.get('@postComment').should((xhr) => {
            expect(xhr.requestBody).to.include('email')
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
        })

        // Stub a response to PUT comments/ ****
        cy.route({
            method: 'PUT',
            url: 'comments/*',
            status: 404,
            response: { error: 'I am learning Cypress' },
            delay: 500,
        }).as('putComment')

        // we have code that puts a comment when
        // the button is clicked in scripts.js
        cy.get('.network-put').click()

        cy.wait('@putComment')

        // our 404 statusCode logic in scripts.js executed
        cy.get('.network-put-comment').should('contain', 'I am learning Cypress')

    });

});