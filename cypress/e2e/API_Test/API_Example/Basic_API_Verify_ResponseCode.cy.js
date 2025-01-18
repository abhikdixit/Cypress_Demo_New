// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('GET Service Example', ()=>{
 
    it("Status Code and Header Validation", ()=>{
         
        //cy.request("https://jsonplaceholder.typicode.com/posts/").as('req')
        cy.request("https://reqres.in/api/users/1").as('res')
        .its('status')
        .should('equal', 200);
    });
 
});