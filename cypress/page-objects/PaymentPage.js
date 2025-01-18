export class PaymentPage {
  payeeSelectbox
  payeeDetailButton
  payeeDetail
  accountSelectbox
  amountInput
  dateInput
  descriptionInput
  submitPaymentButton
  message

  constructor() {
    this.payeeSelectbox = '#sp_payee'
    this.payeeDetailButton = '#sp_get_payee_details'
    this.payeeDetail = '#sp_payee_details'
    this.accountSelectbox = '#sp_account'
    this.amountInput = '#sp_amount'
    this.dateInput = '#sp_date'
    this.descriptionInput = '#sp_description'
    this.submitPaymentButton = '#pay_saved_payees'
    this.message = '#alert_content > span'
  }

  createPayment(payeeSelectbox, accountSelectbox, amountInput, dateInput, descriptionInput) {
    cy.get(this.payeeSelectbox).select(payeeSelectbox)
    cy.get(this.payeeDetailButton).click()
    cy.get(this.payeeDetail).should('be.visible')
    cy.get(this.accountSelectbox).select(accountSelectbox)
    cy.get(this.amountInput).type(amountInput)
    cy.get(this.dateInput).type(`${dateInput}{enter}`)
    cy.get(this.descriptionInput).type(descriptionInput)
    cy.get(this.submitPaymentButton).click()
  }

  assertSuccessMessage() {
    cy.get(this.message).should('be.visible')
    cy.get(this.message).should('contain.text', 'The payment was successfully submitted')
  }
}
