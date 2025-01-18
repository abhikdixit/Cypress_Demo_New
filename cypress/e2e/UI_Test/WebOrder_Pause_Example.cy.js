// <reference types="cypress" />

describe('WebOrder E2E Functionality smoke', () => {
    it('Login to Web Order', () => {
        cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx')

        /* ==== Generated with Cypress Studio ==== */
        cy.get('#ctl00_MainContent_username').type('Tester');
        cy.get('#ctl00_MainContent_password').type('test');
        cy.get('#ctl00_MainContent_login_button').click();
        cy.get('#ctl00_menu > :nth-child(3) > a').click();
        cy.get('#ctl00_MainContent_fmwOrder_ddlProduct').select('FamilyAlbum');
        cy.get('[colspan="2"] > :nth-child(3) > :nth-child(2)').click();
        cy.get('#ctl00_MainContent_fmwOrder_txtQuantity').type('5');
        //Add Random number to user name
        const ExpUserName = 'Abhi' + Math.random() * 1000;
        cy.get('#ctl00_MainContent_fmwOrder_txtName').type(ExpUserName);
        cy.get('#ctl00_MainContent_fmwOrder_TextBox2').type('ABC');
        cy.get('#ctl00_MainContent_fmwOrder_TextBox3').type('Bangalore');
        cy.get('#ctl00_MainContent_fmwOrder_TextBox4').type('KA');
        cy.get('#ctl00_MainContent_fmwOrder_TextBox5').type('560076');
        cy.get('#ctl00_MainContent_fmwOrder_cardList_0').check();
        cy.get('#ctl00_MainContent_fmwOrder_TextBox6').type('123456789');
        cy.get('#ctl00_MainContent_fmwOrder_TextBox1').type('12/23');
        cy.get('#ctl00_MainContent_fmwOrder_InsertButton').click();
        //Verify the Order successful message
        cy.get('strong').should('contain', 'New order has been successfully added.')
        //Click on View All Order Link
        cy.get('#ctl00_menu > :nth-child(1) > a').click();
        cy.xpath("//td[text()='" + ExpUserName + "']").should('have.text', ExpUserName)

        //Edit User and Verfiy user details got updated
        //Click on Edit of Added user and Update the Role to ESS from Admin and Verify that it got updated
        cy.xpath("//td[text()='" + ExpUserName + "']/following-sibling::td/input").click();
        cy.get('#ctl00_MainContent_fmwOrder_TextBox2').clear();
        cy.get('#ctl00_MainContent_fmwOrder_TextBox2').type('BTM');
        cy.get('#ctl00_MainContent_fmwOrder_UpdateButton').click()
        cy.pause()
        //Verify that Street GOt Updated
        cy.xpath("//td[text()='" + ExpUserName + "']/following-sibling::td[text()='BTM']").should('have.text', 'BTM')

        //Delete the User and Verify the User got deleted
        cy.xpath("//td[text()='" + ExpUserName + "']/preceding-sibling::td/input").click()
        cy.get('#ctl00_MainContent_btnDelete').click()
        cy.get("#ctl00_MainContent_orderGrid").should('not.have.text',ExpUserName)
        //Click on Logout
        cy.get('#ctl00_logout').click();
        /* ==== End Cypress Studio ==== */
    })
})