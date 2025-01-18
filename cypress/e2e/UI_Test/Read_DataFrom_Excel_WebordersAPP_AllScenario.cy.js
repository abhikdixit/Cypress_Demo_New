describe('Read Data From Excel File', () => {
  beforeEach(() => {
    cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  });

  it('should read and verify the content of the CSV file', () => {
    const xlsxFileName = 'WebOrder_TS_All_Scenario.xlsx';

    // Use the custom command to read the data from Excel file
    cy.readExcelFixture(xlsxFileName).then((xlsxData) => {
      cy.log(JSON.stringify(xlsxData));
      const finaldata = JSON.parse(JSON.stringify(xlsxData));
      // Perform assertions on the CSV data
      finaldata.forEach((record) => {
        cy.get('input[name="ctl00\\$MainContent\\$username"]').clear().type(record.uname);
        cy.get('input[name="ctl00\\$MainContent\\$password"]').clear().type(record.pass);
        cy.contains('Login').click();

        if (record.Exp_Result === 'List of All Orders') {
          cy.get("div[class='content'] h2").should('contain.text', record.Exp_Result);
          cy.contains('Logout').click();
          cy.wait(1000); // Wait for the page to load
        } else if (record.Exp_Result === 'Invalid Login or Password.') {
          cy.get("#ctl00_MainContent_status").should('have.text', record.Exp_Result);
        }
      });
    });
  });
});
