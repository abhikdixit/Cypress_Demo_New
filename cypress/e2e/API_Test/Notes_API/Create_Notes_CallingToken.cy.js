import { accessToken } from './BaseTest'

describe('Create Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com'
    let token

    before(() => {
        accessToken("abhinay.dixit@hotmail.com", "pass@1234").then((tkn) => {
            token = tkn
            expect(token).to.exist
        })
    })

    it('POST Request - Create Notes', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/notes`,
            headers: {
                'x-auth-token': token,
            },
            body: {
                title: "Cypress_Notes_New",
                description: "Done via API",
                category: "Personal"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully created')
            expect(response.body.data.title).to.eq('Cypress_Notes_New')
        })
    })
})