import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { PayBillsPage } from "../../page-objects/PayBillsPage";
import { AddNewPayeePage } from "../../page-objects/AddNewPayeePage";
const { Navbar } = require("../../page-objects/components/Navbar");

describe("Add New Payee", () => {
  let homePage;
  let loginPage;
  let payBillsPage;
  let navbar;
  let addNewPayeePage;

  beforeEach(() => {
    cy.visit("http://zero.webappsecurity.com/index.html");
    homePage = new HomePage();
    loginPage = new LoginPage();
    payBillsPage = new PayBillsPage();
    navbar = new Navbar();
    addNewPayeePage = new AddNewPayeePage();

    homePage.clickOnSignIn();
    loginPage.login("username", "password");
    // This is to bypass SSL error
    cy.visit("http://zero.webappsecurity.com/bank/transfer-funds.html");
  });

  it("add new payee", () => {
    navbar.clickOnTab("Account Summary");
    navbar.clickOnTab("Pay Bills");
    payBillsPage.clickOnPayBillsTab("Add New Payee");
    addNewPayeePage.createNewPayee(
      "Livevox",
      "RichmondCircle",
      "SavingsAccount",
      "SalaryAccount123"
    );
    addNewPayeePage.addPayee();
  });
});
