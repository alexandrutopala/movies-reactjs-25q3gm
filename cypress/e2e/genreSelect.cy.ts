describe('GenreSelect', () => {
  it('renders and highlights the selected genre and changes on click', () => {
    cy.visit('/')

    // initial state from App: 'All' is selected
    cy.contains('button', 'All')
      .should('have.class', 'text-main-red')
      .and('have.class', 'border-main-red')

    cy.contains('button', 'Action')
      .should('have.class', 'text-gray-500')
      .and('have.class', 'border-transparent')

    // click to change selection -> parent App updates state
    cy.contains('button', 'Action').click()

    cy.contains('button', 'Action')
      .should('have.class', 'text-main-red')
      .and('have.class', 'border-main-red')

    cy.contains('button', 'All')
      .should('not.have.class', 'text-main-red')
      .and('not.have.class', 'border-main-red')
  })
})


