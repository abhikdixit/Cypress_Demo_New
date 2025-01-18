//import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage {
//exports.LoginPage = class LoginPage {
  // Define selectors
  // readonly page: Page
  usernameInput = '#user_login'
  passwordInput = '#user_password'
  submitButton = '.btn'
  errorMessage = '.alert-error'
  keepmesignedin = 'input[name="keep_me_signed_in"]'
  Forgetpassword = "a[href='/forgot-password.html']"

  // Init selectors using constructor
  constructor() {
     super()
  }

  // Define login page methods
  async login(username, password) {
    cy.get(this.usernameInput).type(username)
    cy.get(this.passwordInput).type(password)
    cy.get(this.submitButton).click()
  }

  async assertErrorMessage() {
    cy.get(this.errorMessage).should('contain.text', 'Login and/or password are wrong.')
  }

  async snapshotLoginForm() {
    cy.get('form').screenshot('login-form.png')
  }

  async snapshotErrorMessage() {
    cy.get(this.errorMessage).screenshot('login-error.png')
  }

  async clickonForgetPasswordLink() {
    cy.get(this.Forgetpassword).click()
  }
}
