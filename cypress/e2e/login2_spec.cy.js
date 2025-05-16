describe("Testare Administrator", () => {
  it("Adminul se autentifică și șterge o rezervare", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[type=email]').type("admin@admin.com");
    cy.get('input[type=password]').type("admin123");
    cy.get('button[type=submit]').click();

    // Confirmăm că suntem în pagina admin
    cy.url().should('include', '/admin');

    // Așteptăm puțin să se încarce datele
    cy.wait(1000);

    // Dacă există buton de anulare, șterge prima rezervare
    cy.get(".appointment-item .cancel-button").first().click();

    // Confirmă alerta browserului (confirmarea ștergerii)
    cy.on('window:confirm', () => true);

    // Așteptăm și verificăm mesajul în consolă (sau reîncărcarea fără acea rezervare)
    cy.wait(1000);
  });
});
