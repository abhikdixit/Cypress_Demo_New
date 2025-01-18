// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('POST- Service Example', () => {
    Cypress.config('baseUrl', 'https://reqres.in/api')
    it("POST - an Employee records", () => {
        const item = { "name": "Kumar", "job": "Engineer" }
        cy.request('POST', '/users', item).then((response) => {
            expect(response).to.have.property('status', 201)
            expect(response.body).to.not.be.null
            expect(response.body).to.include({ name: 'Kumar' })

        })
    });
});