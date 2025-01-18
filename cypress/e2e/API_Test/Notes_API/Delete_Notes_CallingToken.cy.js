import { accessToken } from './BaseTest'

describe('Create Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com'
    let token
    let id
    let updated_id

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
                title: "Cypress_Notes",
                description: "Done via API",
                category: "Work"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully created')
            expect(response.body.data.title).to.eq('Cypress_Notes')
            id = response.body.data.id
        })
    })

    it('PUT Request - Update Notes', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/notes/api/notes/${id}`,
            headers: {
                'x-auth-token': token,
            },
            body: {
                title: "Cypress_Updated_Notes",
                description: "Done via PUT API request",
                category: "Personal",
                completed: true
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully Updated')
            expect(response.body.data.title).to.eq('Cypress_Updated_Notes')
            updated_id = response.body.data.id
        })
    })

    it('DELETE Request - Delete Notes', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/notes/api/notes/${updated_id}`,
            headers: {
                'x-auth-token': token,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully deleted')
        })
    })
})