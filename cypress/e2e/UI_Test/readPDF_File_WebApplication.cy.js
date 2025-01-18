describe('PDF Fixture Test', () => {
    it('read and verify PDF content', () => {

cy.visit("https://sbi.co.in/web/careers/current-openings");
cy.get("div[id='section0'] p:nth-child(1)").click();
// removing the target attribute from the link with removeAttr()
cy.get("a[href='/documents/77530/43947057/03012025_BIODATA_ONLINE+APPLICATION+ARCHIVIST.pdf/f27da06c-9a02-4ba8-2fa3-9fd5f9a187fc?t=1735882889244']").invoke('removeAttr', 'target').click();
// assertion to verify the current Url
cy.url({timeout: 200000}).should('include','BIODATA_ONLINE');

});
});
