describe('Query Filter', () => {
  it('should filter movies when a query is entered and update the URL', () => {
    cy.visit('/');

    const searchQuery = 'Dune';

    cy.get('[data-cy="search-input"]').type(searchQuery);
    cy.get('[data-cy="search-button"]').click();

    cy.url().should('include', `title=${searchQuery}`);

    cy.get('[data-cy="movie-list"]').should('have.length.gt', 0);
  });

  it('should clear the filter when the search query is cleared', () => {
    // Start with a search query in the URL
    const searchQuery = 'Dune';
    cy.visit(`/?title=${searchQuery}`);

    // Ensure the input has the value from the URL
    cy.get('[data-cy="search-input"]').should('have.value', searchQuery);

    // Clear the input and submit
    cy.get('[data-cy="search-input"]').clear();
    cy.get('[data-cy="search-button"]').click().wait(300);

    // The URL should not contain the title query anymore
    cy.url().should('not.include', `title=`);
  });
});
