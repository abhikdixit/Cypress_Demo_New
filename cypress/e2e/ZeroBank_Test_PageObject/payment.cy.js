const { LoginPage } = require('../../page-objects/LoginPage')
const { HomePage } = require('../../page-objects/HomePage')
const { PaymentPage } = require('../../page-objects/PaymentPage')
const { Navbar } = require('../../page-objects/components/Navbar')
const testData = require('./TestData/payment.json')

describe('New Payment', () => {
  let homePage
  let loginPage
  let paymentPage
  let navbar

  beforeEach(() => {
    cy.visit('http://zero.webappsecurity.com/index.html')
    homePage = new HomePage()
    loginPage = new LoginPage()
    paymentPage = new PaymentPage()
    navbar = new Navbar()

    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    //This is to bypass SSL error
    cy.visit('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  it('Should send new payment', () => {
    //homePage.clickOnOnlineBankingLink()
    navbar.clickOnTab('Pay Bills')
    paymentPage.createPayment(testData.payeeSelectbox, testData.accountSelectbox, testData.amountInput, testData.dateInput, testData.descriptionInput)
    paymentPage.assertSuccessMessage()
  })
})
