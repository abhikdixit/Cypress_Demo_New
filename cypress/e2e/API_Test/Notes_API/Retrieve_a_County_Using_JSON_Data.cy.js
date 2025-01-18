describe('API Testing', () => {
  const baseUrl = 'https://demo.spreecommerce.org'

  before(() => {
    cy.fixture('Retrieve_a_Country.json').as('countryData')
  })

  it('Get Country', function() {
    this.countryData.forEach((data) => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/v2/storefront/countries/${data.iso}`
      }).then((response) => {
        expect(response.status).to.eq(200)
        const responseBody = response.body
        console.log(responseBody)
        expect(responseBody.data.attributes.iso_name).to.eq(data.iso_name)
      })
    })
  })
})