function accessToken(email, password) {
    const baseUrl = 'https://practice.expandtesting.com'
    cy.log("Getting Access Token....")
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/notes/api/users/login`,
        body: {
            "email": email,
            "password": password
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.token).to.exist
        const token = response.body.data.token
        cy.log(token)
        return cy.wrap(token)
    })
}

export { accessToken }