class TransferFundPage {
  fromAccount;
  toAccount;
  amount;
  descriptionInput;
  accountSelectbox;
  continueButton;
  message;
  fundTransferPage;
  verifyDetail;
  submitPaymentButton;
  CancelPaymentButton;

  constructor() {
    this.fromAccount = "#tf_fromAccountId";
    this.toAccount = "#tf_toAccountId";
    this.amount = "#tf_amount";
    this.descriptionInput = "#tf_description";
    this.continueButton = "#btn_submit";
    this.verifyDetail = "h2:contains('Transfer Money & Make Payments - Verify')";
    this.submitPaymentButton = "button[type='submit']";
    this.message = "div.alert.alert-success";
    this.fundTransferPage = "h2.board-header";
    this.CancelPaymentButton = "#btn_cancel";
  }

  async makePayment(selectFromAccount, toAccount, amount, description) {
    cy.get(this.fromAccount).select(selectFromAccount);
    cy.get(this.toAccount).select(toAccount);
    cy.get(this.amount).type(amount);
    cy.get(this.descriptionInput).type(description);
    cy.get(this.continueButton).click();
  }

  // async resetPayment(selectFromAccount, toAccount, amount, description) {
  //   cy.get(this.fromAccount).select(selectFromAccount);
  //   cy.get(this.toAccount).select(toAccount);
  //   cy.get(this.amount).type(amount);
  //   cy.get(this.descriptionInput).type(description);
  //   cy.get(this.continueButton).click();
  // }

  async verifyAndSubmit() {
    cy.get(this.verifyDetail).should('be.visible');
    cy.get(this.submitPaymentButton).click();
  }

  async verifyAndCancel() {
    cy.get(this.verifyDetail).should('be.visible');
    cy.get(this.CancelPaymentButton).click();
  }

  async assertSuccessMessage() {
    cy.get(this.message).should('be.visible');
    cy.get(this.message).should('contain.text', "You successfully submitted your transaction.");
  }

  async assertSamePage() {
    cy.get(this.fundTransferPage).should('be.visible');
    cy.get(this.fundTransferPage).should('contain.text', "Transfer Money & Make Payments");
  }
}

module.exports = { TransferFundPage };