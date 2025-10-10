describe('Movie Navigation', () => {
  it('should navigate to movie details page when a movie tile is clicked', () => {
    cy.visit('/');

    // Wait for movies to load
    cy.get('[data-cy="movie-list"]').should('have.length.gt', 0);

    // Click on the first movie tile
    cy.get('[data-cy="movie-list"]').first().click();

    // The URL should now be the movie details page
    cy.url().should('match', new RegExp(`${Cypress.config().baseUrl}/[0-9]+.*`));

    // The movie details component should be visible
    cy.get('[data-cy="movie-card"]').should('be.visible');
  });
});
