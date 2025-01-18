import { accessToken } from './BaseTest'

describe('Create Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com'
    let token
    let id

    before(() => {
        accessToken("abhinay.dixit@hotmail.com", "pass@1234").then((tkn) => {
            token = tkn
            expect(token).to.exist
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
                title: "Cypress_Notes",
                description: "Done via API",
                category: "Personal"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully created')
            expect(response.body.data.title).to.eq('Cypress_Notes')
            id = response.body.data.id
            cy.wrap(id).as('id')
        })
    })

    it('PUT Request - Update Notes', function() {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/notes/api/notes/${this.id}`,
            headers: {
                'x-auth-token': this.token,
            },
            body: {
                title: "Cypress_Updated_Notes",
                description: "Done via PUT API request",
                category: "Work",
                completed: true
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully Updated')
            expect(response.body.data.title).to.eq('Cypress_Updated_Notes')
        })
    })

    it.skip('PUT Request - Update Notes Again', function() {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/notes/api/notes/${this.id}`,
            headers: {
                'x-auth-token': this.token,
            },
            body: {
                title: "Cypress_Notes",
                description: "Updated via API",
                category: "Home",
                completed: true
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully Updated')
            expect(response.body.data.title).to.eq('Cypress_Notes')
        })
    })
})