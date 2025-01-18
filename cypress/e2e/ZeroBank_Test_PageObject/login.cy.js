import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

describe('Login / Logout Flow @smoke', () => {
  let loginPage = new LoginPage()
  let homePage = new HomePage()

  // Before Hook
  beforeEach(() => {
    loginPage = new LoginPage()
    homePage = new HomePage()

    homePage.visit()
  })

  // Negative Scenario
  it('Negative Scenario for login', () => {
    homePage.clickOnSignIn()
    loginPage.login('invalid username', 'invalid password')
    cy.wait(3000)
    loginPage.assertErrorMessage()
  })

  // Positive Scenario + Logout
  it('Positive Scenario for login + logout', () => {
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    //This is to bypass SSL error
    cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html')
    //Below practice is not advisable
    cy.get('#account_summary_tab').should('be.visible')
    homePage.logout()
    // cy.visit('http://zero.webappsecurity.com/logout.html')
    cy.url().should('eq', 'http://zero.webappsecurity.com/index.html')
  })
})
