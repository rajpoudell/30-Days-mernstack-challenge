// cypress/e2e/formSubmission.spec.js

describe('User Registration Form', () => {
  beforeEach(() => {
      // Visit the form page before each test
      cy.visit('http://localhost:3000'); // Update this to the URL where your app is running
  });

  it('should fill out the form, submit it, and display success message', () => {
      // Fill out the form fields
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="password"]').type('securepassword123');
      cy.get('input[name="repeatPassword"]').type('securepassword123');
      cy.get('input[name="firstname"]').type('John');
      cy.get('input[name="lastname"]').type('Doe');
      cy.get('input[name="phone"]').type('123-456-7890');
      cy.get('input[name="company"]').type('Acme Corp');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Verify the expected outcome
      cy.contains('User registered successfully!').should('be.visible');
  });

  it('should show error message when passwords do not match', () => {
      // Fill out the form fields with non-matching passwords
      cy.get('input[name="email"]').type('jane.doe@example.com');
      cy.get('input[name="password"]').type('securepassword123');
      cy.get('input[name="repeatPassword"]').type('differentpassword');
      cy.get('input[name="firstname"]').type('Jane');
      cy.get('input[name="lastname"]').type('Doe');
      cy.get('input[name="phone"]').type('123-456-7890');
      cy.get('input[name="company"]').type('Acme Corp');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Verify the expected outcome
      cy.contains('Passwords do not match').should('be.visible');
  });

  it('should show server error message for existing email', () => {
      // Fill out the form fields with an email that already exists
      cy.get('input[name="email"]').type('john.doe@example.com'); // Use an email that your test server knows as existing
      cy.get('input[name="password"]').type('securepassword123');
      cy.get('input[name="repeatPassword"]').type('securepassword123');
      cy.get('input[name="firstname"]').type('Existing');
      cy.get('input[name="lastname"]').type('User');
      cy.get('input[name="phone"]').type('123-456-7890');
      cy.get('input[name="company"]').type('Existing Corp');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Verify the expected outcome
      cy.contains('Error: Email already exists').should('be.visible');
  });
});
