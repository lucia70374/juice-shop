///<reference types="cypress"/>

describe('Signup tests', () => {
    let randomString = Math.random().toString(36).substring(2);
    const email = "Tanja" + randomString + "@gmail.com";
    //let password = randomString;
    const password = "password1";
    const securityAnswer = "Tomic"
    describe('Login via UI', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/#/');
            cy.get('.close-dialog').click();
            //cy.get('.cdk-overlay-backdrop').click(-50, -50, {force:true})
            cy.get('.mat-toolbar').contains('Account').click();
            //cy.get('#navbarAccount').click();
            cy.get('#navbarLoginButton').click();
            //cy.visit('http://localhost:3000/#/register');
        })
        it('Valid sign up', () => {


            cy.get('#newCustomerLink').contains("Not yet a customer?").click({
                force: true
            });
            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(password);
            cy.get('.mat-select-arrow').click();
            cy.get('mat-option').contains("Mother's maiden name?").click();
            cy.get('#securityAnswerControl').type(securityAnswer);
            cy.get('button').contains('Register').click();
            cy.get('.mat-snack-bar-container').contains('Registration completed successfully.')

        })
        it('Valid Login', () => {

            cy.get('#email').type(email);
            cy.get('#password').type(password);
            cy.get('#loginButton').click();
            cy.get('.fa-layers-counter').contains("0");

        })
    })
    describe('API tests', () => {
        const userCredentials = {
            "email": email,
            "password": password
        }

        it('Login via API', () => {

           
            cy.request('POST', 'http://localhost:3000/rest/user/login', userCredentials)
                .then(response => {
                    expect(response.status).to.eq(200);
                })




        })
        it('Login via Token, non UI', () => {

            
            cy.request('POST', 'http://localhost:3000/rest/user/login', userCredentials)
                .its('body').then(body => {
                   const token = body.authentication.token;
                   cy.wrap(token).as('userToken');
                   const userToken = cy.get('@userToken');
                   cy.visit('http://localhost:3000/', {
                       onBeforeLoad(browser) {
                           browser.localStorage.setItem('token', userToken);
                       }
                   })
                   cy.wait(2000);
                   cy.get('.cdk-overlay-backdrop').click(-50, -50, {force:true});
                   cy.get('.fa-layers-counter').contains("0"); 
                })




        })

    })

})