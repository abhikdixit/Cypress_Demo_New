/// <reference types="cypress" />

describe('HDFC NetBanking Frame Interaction', () => {
   it('Should interact with the login frame', () => {
     // Visit the HDFC NetBanking page
     cy.visit('https://netbanking.hdfcbank.com/netbanking/');
 
     // Ensure the iframe is loaded and find elements within it
     cy.frameLoaded('frame[name="login_page"]'); // Adjust the selector to match your iframe
     cy.iframe('frame[name="login_page"]').find('input[name="fldLoginUserId"]')
       .type('1000'); // Replace with the actual user ID
     cy.iframe('frame[name="login_page"]').find('a[onclick="return fLogon();"]')
       .click();
      });
 });
 