// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('DELETE Service Example', ()=>{
 
    it("DELETE - an Employee records",()=>{
 
        cy.request('DELETE','https://reqres.in/api/users/2').its('status').should('eq',204)
    });
 
});