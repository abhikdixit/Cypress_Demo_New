import Ajv from 'ajv';
// Update the import path for NoteSchema
import { NoteSchema } from '../schema/NoteSchema';
import { accessToken } from './BaseTest'
// Initialize AJV (Another JSON Schema Validator)
const ajv = new Ajv();

describe('Schema Validation Tests', () => {
  let token;
  const baseUrl = 'https://practice.expandtesting.com'
  before(() => {
    // Fetch the OAuth token
    accessToken("abhinay.dixit@hotmail.com", "pass@1234").then((accessToken) => {
      token = accessToken;
      expect(token).to.exist;
    });
  });

  it('Validate Get Notes Response Schema', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/notes/api/notes`,
      headers: {
        'x-auth-token': `${token}`,
      },
      body: {         
        title: "Playwright_Notes",
        description: "Done via API",
        category: "Personal"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body;
      console.log(responseBody);

      // Validate the schema
      if (typeof NoteSchema !== 'object' && typeof NoteSchema !== 'boolean') {
        throw new Error('Schema must be an object or boolean');
      }
      const validate = ajv.compile(NoteSchema);
      const valid = validate(responseBody.data);
      
      if (!valid) {
        console.error('Schema validation errors:', validate.errors);
      }

      expect(valid).to.be.true;
    });
  });
});