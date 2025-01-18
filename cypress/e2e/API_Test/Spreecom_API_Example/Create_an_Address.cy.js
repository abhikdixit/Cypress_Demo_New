let token = 0;

describe("postToken", ()=> {

    before(() => {
        cy.request({
            method: 'POST',
            //url: cypress.config.js('baseUrl'), //get from cypress.env.json
            url: 'https://demo.spreecommerce.org/spree_oauth/token',
            //form: true, //sets to application/x-www-form-urlencoded
            body: {
              grant_type: 'password',
              username: "nice@spree.com",
              password: "spree123"
            }
          })
          .then((response)=>{
            expect(response.status).to.eq(200);
             // response.body is automatically serialized into JSON
             cy.log(response.body);
             console.log(response.body);
             expect(response.body).to.have.property('token_type','Bearer')
             token = response.body.access_token;
             cy.log(token);
          })
      });

it("Create an Address", () => {
    //cy.getLocalStorage("access_token").should("exist");
    //cy.getLocalStorage("access_token").then(token => {
      //console.log("access_token", token);

      cy.request({
        method: 'POST',
        url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
        auth: {
            bearer: token
            
        },
        body :
        {
            "address": {
              firstname: "Abhi",
              lastname: "Doe",
              address1: "Aerocity",
              address2: "2nd Floor",
              city: "Texas",
              phone: "5438764532",
              zipcode: "20814",
              state_name: "MD",
              country_iso: "US"
            }
    }}).then((response)=>{
    expect(response.status).to.equal(200);
     // response.body is automatically serialized into JSON
     cy.log(response.body);
     //id = response.body.data.id;
      expect(response.body.data).to.have.property('type','address')
  //    expect(response.body.data.attributes).to.have.property('address1','Aerocity')
      expect(response.body.data.attributes).to.have.property('firstname','Abhi')

});
});
});