describe("postToken", ()=> {

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
  
    it("should still exist identity in localStorage", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token", token);

        cy.request({
          method: 'GET',
          url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
          auth: {
              bearer: token
          }
      }).then((response)=>{
      expect(response.status).to.equal(200);
       // response.body is automatically serialized into JSON
       cy.log(response.body);
       expect(response.body.data[0]).to.have.property('type','address')
       expect(response.body.data[0].attributes).to.have.property('address1','Aerocity')
       expect(response.body.data[0].attributes).to.have.property('firstname','Abhi')

  });
});
});
  it("403 Forbidden - You are not authorized to access this page.", () => {
    cy.getLocalStorage("access_token").should("exist");
    cy.getLocalStorage("access_token").then(token => {
      console.log("access_token", token);

      cy.request({
        method: 'GET',
        url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
        auth: {
            bearer: token
        }
    }).then((response)=>{
    expect(response.status).to.equal(200);
     // response.body is automatically serialized into JSON
     cy.log(response.body);
     //expect(response.body.data[0]).to.have.property('type','address')
     //expect(response.body.data[0].attributes).to.have.property('address1','BTM')
     //expect(response.body.data[0].attributes).to.have.property('firstname','Rohan')

});
});
});
});