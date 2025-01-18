// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('GET Service Example', ()=>{
 
    it("Status Code and Header Validation", ()=>{
           cy.request("https://jsonplaceholder.typicode.com/posts/").as('response')
        .its('status')
        .should('equal', 200);
 
        cy.get('@response')
           .its('headers')
           .its('content-type')
           .should('include', 'application/json; charset=utf-8');
 
    });
 
});