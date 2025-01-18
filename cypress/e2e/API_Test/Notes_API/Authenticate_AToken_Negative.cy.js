describe('Access Token', () => {
  const baseUrl = 'https://practice.expandtesting.com';

  it('POST Request - Access Token', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/notes/api/users/login`,
      body: {
        "email": "abhinay.dixit1@hotmail.com",
        "password": "pass@1234"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq("Incorrect email address or password");
    });
  });
});