describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com'

    it('POST Request - Access Token', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/users/login`,
            body: {
                "email": "abhinay.dixit@hotmail.com",
                "password": "pass@1234"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.token).to.exist
            expect(response.body.message).to.eq("Login successful")
            const token = response.body.data.token
            cy.log(token)
        })
    })
})