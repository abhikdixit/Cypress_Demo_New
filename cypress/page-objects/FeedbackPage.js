export class FeedbackPage {
  constructor() {
    this.nameInput = '#name';
    this.emailInput = '#email';
    this.subjectInput = '#subject';
    this.commentInput = '#comment';
    this.clearButton = "input[name='clear']";
    this.submitButton = "input[type='submit']";
    this.feedbackTitle = '#feedback-title';
  }

  async fillForm(name, email, subject, comment) {
    cy.get(this.nameInput).type(name);
    cy.get(this.emailInput).type(email);
    cy.get(this.subjectInput).type(subject);
    cy.get(this.commentInput).type(comment);
  }

  async resetForm() {
    cy.get(this.clearButton).click();
  }

  async submitForm() {
    cy.get(this.submitButton).click();
  }

  async assertReset() {
    cy.get(this.nameInput).should('have.value', '');
    cy.get(this.commentInput).should('have.value', '');
  }

  async feedbackFormSent() {
    cy.get(this.feedbackTitle).should('be.visible');
  }
}
