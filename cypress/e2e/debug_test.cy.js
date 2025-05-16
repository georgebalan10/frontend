describe('DEBUG Vizibilitate', () => {
    it('Face screenshot + listează toate elementele input', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(3000);  // așteaptă 3 secunde
        cy.screenshot();  // face screenshot automat
        cy.get('input').each(($el, index) => {
            cy.log(`Input ${index}:`, $el);
        });
    });
});
