describe('API Testing', () => {
    const baseUrl = 'https://demo.spreecommerce.org'

    it('Get Default Country', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/api/v2/storefront/countries/default`
        }).then((response) => {
            expect(response.status).to.eq(200)
            const responseBody = response.body
            cy.log(JSON.stringify(responseBody))
            expect(responseBody.data.attributes.iso_name).to.eq('UNITED STATES')
            expect(responseBody.data.attributes.name).to.eq('United States')
        })
    })
})