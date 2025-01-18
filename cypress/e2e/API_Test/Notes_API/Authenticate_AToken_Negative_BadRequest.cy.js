describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com'

    it('POST Request - Access Token', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/users/login`,
            failOnStatusCode: false,
            body: {
                "email": "abhinay.dixit@hotmail.com",
                "password": ""
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq("Password must be between 6 and 30 characters")
        })
    })
})