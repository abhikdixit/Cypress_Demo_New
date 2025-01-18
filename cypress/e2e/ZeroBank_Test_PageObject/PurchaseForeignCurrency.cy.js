import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { Navbar } from '../../page-objects/components/Navbar';
import { PurchaseForeignCurrencyCash } from '../../page-objects/PurchaseForeignCurrency';
import { PayBillsPage } from '../../page-objects/PayBillsPage';

describe('Transfer Funds and Make Payment', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const navbar = new Navbar();
  const purchaseCurrency = new PurchaseForeignCurrencyCash();
  const payBills = new PayBillsPage();
  let users;

  before(() => {
    cy.fixture('PurchaseForeignCurrencyCash_Scenarios').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('http://zero.webappsecurity.com/index.html');
    homePage.clickOnSignIn();
    loginPage.login('username', 'password');
    // This is to bypass SSL error
    cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html');
  });

  users.forEach((record) => {
    it(`Purchase Foreign Currency Cash - Australia (dollar): ${record.TestCaseID}`, () => {
      navbar.clickOnTab('Pay Bills');
      payBills.clickOnPayBillsTab("Purchase Foreign Currency");
      payBills.purchaseForeignCurrencyTitle();
      
      purchaseCurrency.selectCurrency(record.selectCurrency);
      purchaseCurrency.assertTodaysSellRate();
      purchaseCurrency.enterAmount(record.enterAmount);
      purchaseCurrency.selectRadioButton(record.selectRadioButton);
      purchaseCurrency.clickCalculateCostsButton();
      purchaseCurrency.assertConversionAmount();
      purchaseCurrency.clickPurchaseButton();
      purchaseCurrency.assertSuccessMessage();
    });
  });
});