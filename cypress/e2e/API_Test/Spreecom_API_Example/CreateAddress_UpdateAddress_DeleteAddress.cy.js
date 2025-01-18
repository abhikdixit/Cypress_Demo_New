//update address
let id = 0;
describe("postToken", () => {
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

  it("First Create an Address", () => {
    cy.getLocalStorage("access_token").should("exist");
    cy.getLocalStorage("access_token").then(token => {
      console.log("access_token", token);

      cy.request({
        method: 'POST',
        url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
        auth: {
          bearer: token

        },
        body:
        {
          "address": {
            firstname: "John",
            lastname: "Doe",
            address1: "Aerocity",
            address2: "2nd Floor",
            city: "Texas",
            phone: "5438764532",
            zipcode: "20814",
            state_name: "MD",
            country_iso: "US"
          }
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        // response.body is automatically serialized into JSON
        cy.log(response.body);
        id = response.body.data.id;
        //    expect(response.body.data).to.have.property('type','address')
        //    expect(response.body.data.attributes).to.have.property('address1','Aerocity')
        expect(response.body.data.attributes).to.have.property('firstname', 'John')

      });
    });
  });
  console.log(id);
  it("Then Update the Address", () => {
    cy.getLocalStorage("access_token").should("exist");
    cy.getLocalStorage("access_token").then(token => {
      console.log("access_token", token);

      cy.request({
        method: 'PATCH',
        url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses/' + id,
        auth: {
          bearer: token
        },
        body:
        {
          "address": {
            firstname: "Abhi",
            lastname: "Doe",
            address1: "Aerocity Updated",
            address2: "2nd Floor",
            city: "Texasedited2",
            phone: "5438764532",
            zipcode: "20814",
            state_name: "MD",
            country_iso: "US"
          }
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        // response.body is automatically serialized into JSON
        cy.log(response.body);
        //    expect(response.body.data).to.have.property('type','address')
        //    expect(response.body.data.attributes).to.have.property('address1','Aerocity')
        expect(response.body.data.attributes).to.have.property('firstname', 'Abhi')

      });
    });
  });

  it("Then Delete the Address", () => {
    cy.getLocalStorage("access_token").should("exist");
    cy.getLocalStorage("access_token").then(token => {
      console.log("access_token", token);

      cy.request({
        method: 'DELETE',
        url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses/' + id,
        auth: {
          bearer: token
        }
      }).then((response) => {
        expect(response.status).to.equal(204);
        //expect(response.body.data.attributes).to.have.property('firstname','Abhi')

      });
    });
  });
});