export class PurchaseForeignCurrencyCash {
  currency = '#pc_currency';
  todaysSellRate = '#sp_sell_rate';
  amount = '#pc_amount';
  currencyRadioButtonUSD = '#pc_inDollars_true';
  currencyRadioButtonSelectedCurrency = '#pc_inDollars_false';
  calculateCostsButton = '#pc_calculate_costs';
  conversionAmount = '#pc_conversion_amount';
  PurchaseButton = '#purchase_cash';
  message = '#alert_content > span';

  constructor() {}

  selectCurrency(selectCurrencyValue) {
    cy.get(this.currency).select(selectCurrencyValue);
  }

  enterAmount(enterAmountValue) {
    cy.get(this.amount).type(enterAmountValue);
  }

  selectRadioButton(radioButtonValue) {
    const radioButton = radioButtonValue === 'Selected currency' ? this.currencyRadioButtonSelectedCurrency : this.currencyRadioButtonUSD;
    cy.get(radioButton).check();
  }

  clickCalculateCostsButton() {
    cy.get(this.calculateCostsButton).click();
  }

  assertConversionAmount() {
    cy.get(this.conversionAmount).should('be.visible');
  }

  clickPurchaseButton() {
    cy.get(this.PurchaseButton).click();
  }

  assertTodaysSellRate() {
    cy.get(this.todaysSellRate).should('be.visible');
  }

  assertSuccessMessage() {
    cy.get(this.message)
      .should('be.visible')
      .and('contain.text', 'Foreign currency cash was successfully purchased.');
  }
}