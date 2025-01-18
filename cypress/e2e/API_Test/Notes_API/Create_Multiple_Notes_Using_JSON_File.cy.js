import { getAccessToken } from '../utils/noteOperations.js';

describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com';
  let token;
  let notesData;

  before(function() {
    // Fetch the OAuth token
    cy.wrap(getAccessToken('abhinay.dixit@hotmail.com', 'pass@1234')).then((tkn) => {
      token = tkn;
      expect(token).to.exist;
    });

    // Load notes data from fixture
    cy.fixture('Create_Notes').then((data) => {
      this.notesData = data.notes;
    });
  });

  it('POST Request - Create Notes', function() {
    this.notesData.forEach((note) => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/notes/api/notes`,
        headers: {
          'x-auth-token': token,
        },
        body: note
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Note successfully created');
        expect(response.body.data.title).to.eq(note.title);
      });
    });
  });
});