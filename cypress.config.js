const { defineConfig } = require("cypress");
const fs = require('fs');
const pdf = require('pdf-parse');
const grep = require('@cypress/grep/src/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions:   { 
    charts: true, 
    reportPageTitle: 'Notes_API_Test_Report', 
    embeddedScreenshots: true, 
    inlineAssets: true, 
    saveAllAttempts: false, 
    // Custom metadata 
    metadata: { 
      name: 'Custom Test Suite', 
      date: new Date().toLocaleDateString(), 
      os: process.platform, 
      browser: 'chrome',
      qaname: 'Abhi'
    }
  },
  projectId: 'xi9jwr',
  env:
  {
    URL_ZeroBank: 'http://zero.webappsecurity.com/index.html' // Replace with the actual URL 
  },
  e2e: {
    specPattern: 'cypress/e2e/UI_Test/',
    //specPattern: 'cypress/e2e/ZeroBank_Test_PageObject/',
    //specPattern: 'cypress/e2e/API_Test/Notes_API/',
    //specPattern: 'cypress/e2e/API_Test/API_Example/',
    setupNodeEvents(on, config) {
      //grep(config);
      //return config;
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:browser:launch', (browser = {}, launchOptions) => { 
        // Capture the browser name dynamically 
        config.reporterOptions.metadata.browser = browser.name; 
      });
      on('task', {
        readPdf({ filePath }) {
          const pdfBuffer = fs.readFileSync(filePath);
          return pdf(pdfBuffer).then(data => {
            return data.text;
          });
        }
      });
      //return config;
    },
  },
});
