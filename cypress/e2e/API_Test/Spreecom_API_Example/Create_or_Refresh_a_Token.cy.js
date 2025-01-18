it("Create a Token", () => {

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
     const accessToken = response.body.access_token;
     cy.log(accessToken);
  })
})