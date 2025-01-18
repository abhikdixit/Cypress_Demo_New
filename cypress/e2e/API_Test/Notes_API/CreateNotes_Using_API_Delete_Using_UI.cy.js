import { accessToken } from './BaseTest'

describe('Create Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com'
    let token
    const random_title = "Cypress_Notes " + Math.random() * 1000

    before(() => {
        accessToken("Deekshitha@practice.com", "Deekshitha10").then((tkn) => {
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
                title: random_title,
                description: "Done via API",
                category: "Personal"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Note successfully created')
            expect(response.body.data.title).to.eq(random_title)
            cy.wrap(random_title).as('random_title')
        })
    })

    it('Delete Note using UI', function() {
        cy.visit('https://practice.expandtesting.com/notes/app')
        cy.get('a').contains('Login').click()
        cy.get('#email').type('Deekshitha@practice.com')
        cy.get('#password').type('Deekshitha10')
        cy.get('button').contains('Login').click()
        cy.xpath("//div[text()='" + this.random_title + "']//following-sibling::div/div/button[normalize-space()='Delete']").click()
        cy.xpath("//button[@type='button'][normalize-space()='Delete']").click()
        cy.get('.container').should('not.contain', this.random_title)
    })
})
