describe('Notes App Functional Tests', () => {
  it('Login with invalid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpass');
    cy.contains('Login').click();
    cy.contains('Incorrect password').should('exist');
  });

  it('Signup, login, create, edit, and delete a note', () => {
    // Signup
    cy.visit('http://localhost:3000/signup');
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('testpass123');
    cy.contains('Sign up').click();

    // Login
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('testpass123');
    cy.contains('Login').click();

    // Create Note
    cy.contains('Add Note').click();
    cy.get('input[name="title"]').type('My Note');
    cy.get('textarea[name="content"]').type('This is a test note.');
    cy.contains('Save').click();
    cy.contains('My Note').should('exist');

    // Edit Note
    cy.contains('My Note').click();
    cy.get('input[name="title"]').clear().type('Updated Note');
    cy.contains('Save').click();
    cy.contains('Updated Note').should('exist');

    // Delete Note
    cy.contains('Updated Note').parent().find('button.delete').click();
    cy.contains('Updated Note').should('not.exist');
  });
});