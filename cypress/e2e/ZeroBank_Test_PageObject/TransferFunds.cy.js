const transferFunds = require("./TestData/transferFund.json");
const { LoginPage } = require("../../page-objects/LoginPage");
const { HomePage } = require("../../page-objects/HomePage");
const { Navbar } = require("../../page-objects/components/Navbar");
const { TransferFundPage } = require("../../page-objects/TransferFundPage");

describe("Transfer Funds and Make Payment", () => {
  let homePage;
  let loginPage;
  let navbar;
  let transferFundPage;

  before(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    navbar = new Navbar();
    transferFundPage = new TransferFundPage();

    cy.visit("http://zero.webappsecurity.com");
    homePage.clickOnSignIn();
    loginPage.login("username", "password");
    // This is to bypass SSL error
    cy.visit("http://zero.webappsecurity.com/bank/transfer-funds.html");
    // Save session cookies
    cy.getCookies().then((cookies) => {
      cy.writeFile('cypress/fixtures/cookies.json', cookies);
    });
  });

  beforeEach(() => {
    // Restore session cookies
    cy.visit("http://zero.webappsecurity.com");
    cy.readFile('cypress/fixtures/cookies.json').then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });
    cy.reload();
  });

  transferFunds.forEach((funds) => {
    it(`Transfer Funds ${funds.TC}`, () => {
      // homePage.clickOnOnlineBankingLink();
      cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html')
      navbar.clickOnTab("Transfer Funds");
      transferFundPage.makePayment(
        funds.fromAccount,
        funds.toAccount,
        funds.amount,
        funds.description
      );
      if (funds.amount === "") {
        transferFundPage.assertSamePage();
      } else {
        transferFundPage.verifyAndSubmit();
        transferFundPage.assertSuccessMessage();
      }
    });
  });
});