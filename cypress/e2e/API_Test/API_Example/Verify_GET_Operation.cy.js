// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('GET Service Example', ()=>{
 
    it("GET - an Employee records",()=>{
 
        cy.request('https://reqres.in/api/users').then((response)=>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
            expect(response.body.data).to.have.length(6)

        })
    });
 
});