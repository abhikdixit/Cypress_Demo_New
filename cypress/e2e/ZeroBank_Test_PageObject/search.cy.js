import { HomePage } from '../../page-objects/HomePage'

describe('Search Results @smoke', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    homePage.visit()
  })

  it('Should find search results', () => {
    homePage.searchFor('bank')
    cy.get('li > a').should('have.length', 2)
  })
})
