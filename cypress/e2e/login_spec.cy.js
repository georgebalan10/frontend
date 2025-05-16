describe('Testare Login', () => {
    it('Se autentifică cu succes', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type=email]').type('testuser@example.com');
        cy.get('input[type=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/rezervari');  // sau ruta corectă după login
    });
});

describe('Testare Înregistrare', () => {
    it('Se înregistrează cu succes', () => {
        const randomEmail = `test_${Math.floor(Math.random() * 10000)}@example.com`;
        cy.visit('http://localhost:3000/register');
        cy.get('input[type=text]').eq(0).type('Test User');  // nume
        cy.get('input[type=email]').type(randomEmail);
        cy.get('input[type=password]').eq(0).type('password123');  // parola
        cy.get('input[type=password]').eq(1).type('password123');  // confirmare parola
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/login');  // după înregistrare probabil redirect la login
    });
});

describe('Testare Rezervare', () => {
    before(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type=email]').type('testuser@example.com');
        cy.get('input[type=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/rezervari');
    });

    it('Face o rezervare nouă', () => {
  cy.visit('http://localhost:3000/login');
  cy.get('input[type=email]').type('testuser@example.com');
  cy.get('input[type=password]').type('password123');
  cy.get('button[type=submit]').click();

  cy.url().should('include', '/rezervari');

  cy.visit('http://localhost:3000/rezervari');
  cy.get('input[type=date]').type('2025-06-01');

  cy.get('select').select('10:00');
  cy.get('textarea').type('Testare automată');
  cy.get('button[type=submit]').click();

  // ✅ Nou: verificăm dacă lista rezervărilor conține elementul nou adăugat
  cy.contains('2025-06-01');
  cy.contains('10:00');
  cy.contains('Testare automată');
});

});
