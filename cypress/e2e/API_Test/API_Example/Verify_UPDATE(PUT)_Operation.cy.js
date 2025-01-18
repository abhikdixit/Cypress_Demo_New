// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('PUT- Service Example', () => {
    Cypress.config('baseUrl', 'https://reqres.in/api')
    it("PUT - an Employee records", () => {
        const item = { "name": "Nidhi", "job": "Test" }
        cy.request('PUT', '/users/2', item).then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body).to.include({ name: 'Nidhi' })
            expect(response.body).to.include({ job: 'Test' })
        })
    });
});