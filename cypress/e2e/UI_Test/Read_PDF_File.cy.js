//const pdfFileName = 'EItin_DIXIT_BLR-AUH_TLWMAW43.pdf'; // Name of the PDF file in the fixtures directory
// run this command in terminal : npm install pdf-parse
//
describe('PDF Fixture Test', () => {
  it('read and verify PDF content', () => {
    const pdfPath = 'cypress/fixtures/EItin_DIXIT_BLR-AUH_TLWMAW43.pdf';
    cy.readPdf(pdfPath).then((pdfText) => {
      // Perform assertions on the PDF text content
      cy.log('PDF text - '+pdfText);
      expect(pdfText).to.include('MR ABHINAYKUMAR DIXIT');
      //expect(pdfText).to.include('Name');
    });
  });
});
