describe('Create Notes API Testing', () => {
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

    it('POST Request - Create Notes', function() {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/notes`,
            headers: {
                'x-auth-token': this.token,
            },
            body: {
                title: "Cypress_Notes_API",
                description: "Done via API",
                category: "Work"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully created')
            expect(response.body.data.title).to.eq('Cypress_Notes_API')
        })
    })
})