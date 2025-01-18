export class AddNewPayeePage {
  payeeNameInput;
  payeeAddressInput;
  accountInput;
  payeeDetailsInput;
  addButton;
  addNewPayeeTitle;
  message;
  constructor() {
    this.payeeNameInput = "#np_new_payee_name";
    this.payeeAddressInput = "#np_new_payee_address";
    this.accountInput = "#np_new_payee_account";
    this.payeeDetailsInput = "#np_new_payee_details";
    this.addButton = "#add_new_payee";
    this.addNewPayeeTitle = "//h2[normalize-space()='Who are you paying?']";
    this.message = "#alert_content";
  }

  async createNewPayee(payeeName, payeeAddress, account, payeeDetails) {
    cy.get(this.payeeNameInput).type(payeeName);
    cy.get(this.payeeAddressInput).type(payeeAddress);
    cy.get(this.accountInput).type(account);
    cy.get(this.payeeDetailsInput).type(payeeDetails);
  }

  async addPayee() {
    cy.get(this.addButton).click();
  }

  async assertAddNewPayeeTitle() {
    cy.xpath(this.addNewPayeeTitle).should('be.visible');
  }

  async assertSuccessMessage() {
    cy.get(this.message).should('be.visible');
    cy.get(this.message).should('contain.text', 'successfully created');
  }
}
