
export class PayBillsPage {
    paySavedPayeeTab;
    addNewPayeeTab;
    purchaseForeignCurrencyTab;
    
    constructor() {
        this.paySavedPayeeTab = "//a[text()='Pay Saved Payee']";
        this.addNewPayeeTab = "//a[text()='Add New Payee']";
        this.purchaseForeignCurrencyTab = "//a[text()='Purchase Foreign Currency']";
    }

    async clickOnPayBillsTab(tabName) {
        switch (tabName) {
            case "Pay Saved Payee":
                cy.xpath(this.paySavedPayeeTab).click();
                break;
            case "Add New Payee":
                cy.xpath(this.addNewPayeeTab).click();
                break;
            case "Purchase Foreign Currency":
                cy.xpath(this.purchaseForeignCurrencyTab).click();
                break;
            default:
                throw new Error("This tab does not exist..");
        }
    }
    async paySavedPayeeTitle() {
        cy.xpath(this.paySavedPayeeTab).should('contain.text', "Pay Saved Payee");
    }
    async addNewPayeeTitle() {
        cy.xpath(this.addNewPayeeTab).should('contain.text', "Add New Payee");
    }
    async purchaseForeignCurrencyTitle() {
        cy.xpath(this.purchaseForeignCurrencyTab).should('contain.text', "Purchase Foreign Currency");
    }
}
