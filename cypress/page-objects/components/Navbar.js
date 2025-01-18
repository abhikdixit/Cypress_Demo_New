export class Navbar {
  accountSummary = '#account_summary_tab'
  accountActivity = '#account_activity_tab'
  transferFunds = '#transfer_funds_tab'
  payBills = '#pay_bills_tab'
  myMoneyApp = '#money_map_tab'
  onlineStatements = '#online_statements_tab'

  clickOnTab(tabName) {
    switch (tabName) {
      case 'Account Summary':
        cy.get(this.accountSummary).click()
        break
      case 'Account Activity':
        cy.get(this.accountActivity).click()
        break
      case 'Transfer Funds':
        cy.get(this.transferFunds).click()
        break
      case 'Pay Bills':
        cy.get(this.payBills).click()
        break
      case 'My Money App':
        cy.get(this.myMoneyApp).click()
        break
      case 'Online Statements':
        cy.get(this.onlineStatements).click()
        break
      default:
        throw new Error('This tab does not exist..')
    }
  }
}
