
export class AbstractPage {

  async wait(time) {
    cy.wait(time);
  }

}
