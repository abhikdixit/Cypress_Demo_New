  import { getAccessToken, deleteAllNotes } from '../utils/noteOperations.js';

  describe('Notes API Testing', () => {
    const baseUrl = 'https://practice.expandtesting.com';
    let token;

    before(() => {
      // Fetch the OAuth token
      cy.wrap(getAccessToken('abhinay.dixit@hotmail.com', 'pass@1234')).then((tkn) => {
        token = tkn;
        expect(token).to.exist;
      });
    });

    it('Delete all notes', () => {
      cy.wrap(deleteAllNotes(baseUrl, token)).then(() => {
        cy.log('All notes deleted successfully');
      });
    });
  });
