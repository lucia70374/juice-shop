///<reference types="cypress"/>

describe('Login', () => {
    let randomString = Math.random().toString(36).substring(2);
    const email = "Tanja" + randomString + "@gmail.com";
    //let password = randomString;
    const password = "password1";
    const securityAnswer = "Tomic"
    
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
       
       
       cy.get('#newCustomerLink').contains("Not yet a customer?").click({force:true});
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