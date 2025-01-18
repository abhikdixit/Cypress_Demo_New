describe("Create Address using API and Verify Using UI", ()=> {
  let cname
    before(() => {
      cy.postToken();
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
    });
  
    it("should exist identity in localStorage", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token token", token);
      });
    });
  
    it("Create an Address", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token", token);

        cy.request({
          method: 'POST',
          url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
          auth: {
              bearer: token
              
          },
          body :
          {
              "address": {
                firstname: "Aaryan",
                lastname: "Kumar",
                address1: "BTM",
                address2: "2nd Floor",
                city: "Bethesda",
                phone: "3014445002",
                zipcode: "20814",
                state_name: "MD",
                country_iso: "US"
              }
      }}).then((response)=>{
      expect(response.status).to.equal(200);
       // response.body is automatically serialized into JSON
       cy.log(response.body);
       expect(response.body.data).to.have.property('type','address')
       expect(response.body.data.attributes).to.have.property('address1','BTM')
       expect(response.body.data.attributes).to.have.property('firstname','Aaryan')
       cname= response.body.data.attributes.firstname
  });
});
});

it('Visits the Spreecom UI Page and Verify the Address', function() {
  //Visit the OrnageHRM Website
  cy.visit("https://demo.spreecommerce.org/login");
  
 // Enter UserName and Password
  
  cy.get('#spree_user_email').type('nice@spree.com')
  cy.get('#spree_user_password').type('spree123')
  cy.get("input[value='Login']").click()
  //Verify Address
  cy.get(".account-page-user-full-name").should('have.contain',cname)
    
})
});