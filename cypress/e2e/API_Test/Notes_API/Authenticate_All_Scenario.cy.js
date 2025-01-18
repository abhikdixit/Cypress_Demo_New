/// <reference types="cypress" />

describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com';
    const validCredentials = {
        email: 'abhinay.dixit@hotmail.com',
        password: 'pass@1234'
    };
    const invalidCredentials = {
        email: 'wrong.email@example.com',
        password: 'wrongpassword'
    };

    it('POST Request - Access Token (Valid Credentials)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/users/login`,
            body: validCredentials
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.token).to.exist;
            expect(response.body.message).to.eq('Login successful');
            const token = response.body.data.token;
            cy.log(token);
        });
    });

    it('POST Request - Access Token (Invalid Credentials)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/users/login`,
            body: invalidCredentials,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Incorrect email address or password');
        });
    });

    it('POST Request - Access Token (Missing Credentials)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/notes/api/users/login`,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('A valid email address is required');
        });
    });

});
