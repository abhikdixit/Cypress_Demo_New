// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';
import 'cypress-xpath';

// Read CSV file we have custom Command
const Papa = require('papaparse');


Cypress.Commands.add('readCsvFixture', (fileName) => {
  return cy.fixture(fileName).then((csvData) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  });
});
// Read Excel file we have custom Command
const XLSX = require('xlsx');

Cypress.Commands.add('readExcelFixture', (fileName) => {
  cy.fixture(fileName, 'binary').then((content) => {
    const workbook = XLSX.read(content, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  });
});

Cypress.Commands.add('queryDatabase', (query) => {
  return cy.task('queryDatabase', query);
});


Cypress.Commands.add('readPdf', (pdfPath) => {
  return cy.task('readPdf', { filePath: pdfPath });
});

Cypress.Commands.add('execPythonScript', (scriptPath) => {
  const { exec } = require('child_process');
  cy.log(`Executing Python script: ${scriptPath}`);
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      cy.log(`Execution error: ${error.message}`);
      return;
    }
    cy.log(`stdout: ${stdout}`);
    cy.log(`stderr: ${stderr}`);
  });
});

