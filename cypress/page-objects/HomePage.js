export class HomePage {
   signInButton= '#signin_button'
   searchBox= '#searchTerm'
   linkFeedback= '#feedback'
   linkOnlineBanking= "//strong[normalize-space()='Online Banking']"
   usernameDropdown='username'
   logoutButton='#logout_link'

  visit() {
    cy.visit(Cypress.env('URL_ZeroBank'))
  }

  clickOnSignIn() {
    cy.get(this.signInButton).click()
        //This is to bypass SSL error
        //cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html')
  }

  clickOnFeedbackLink() {
    cy.get(this.linkFeedback).click()
  }

  clickOnOnlineBankingLink() {
    cy.xpath(this.linkOnlineBanking).click()
  }

  searchFor(phrase) {
    cy.get(this.searchBox).type(phrase)
    cy.get(this.searchBox).type('{enter}')
  }

  logout() {
    cy.contains(this.usernameDropdown).click({timeout:30000})
    cy.get(this.logoutButton).click()
  }
}
