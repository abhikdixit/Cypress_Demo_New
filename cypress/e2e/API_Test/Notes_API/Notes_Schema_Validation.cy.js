/// <reference types="cypress" />
import { accessToken } from './BaseTest'
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

describe('JSON Schema Validation for Expand Testing Notes API', () => {
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
        expect(response.status).to.eq(200); // Ensure the response status is 200

        console.log(response.body); // Log the response body for debugging

        const schema = {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          },
          required: ['id', 'title', 'description', 'category', 'created_at', 'updated_at']
        };

        const validate = ajv.compile(schema);
        const valid = validate(response.body);
        cy.log(valid)
        if (!valid) {
          console.log(validate.errors); // Logs the validation errors
        }

        expect(valid).to.be.true; // Asserts the validation result
      });
  });
});
