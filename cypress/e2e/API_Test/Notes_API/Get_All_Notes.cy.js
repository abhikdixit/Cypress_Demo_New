describe('GET ALL Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com'
    let token

    before(() => {
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
            token = response.body.data.token
            cy.wrap(token).as('token')
        })
    })

    it('GET Request - GET All Notes', function() {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/notes/api/notes`,
            headers: {
                'x-auth-token': this.token,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            const responseBody = response.body
            cy.log(JSON.stringify(responseBody))
            expect(responseBody.message).to.eq('Notes successfully retrieved')
        })
    })
})