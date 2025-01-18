/// <reference types="cypress" />
const { exec } = require('child_process');

// Add a custom Cypress command to execute a Python script
Cypress.Commands.add('execPythonScript', (scriptPath) => {
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

describe('Execute Python Script within Cypress', () => {
  it('Should call a Python script and log the output', () => {
    const scriptPath = 'cypress/fixtures/example.py'; // Ensure the path is correct
    cy.execPythonScript(scriptPath);

    // Continue with the rest of your Cypress test
    cy.visit('https://example.com'); // Replace with your test
  });
});
