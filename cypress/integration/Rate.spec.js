describe("Add Rating", () => {
    it("click movie and add rating", () => {
      cy.visit("/");
  
      cy.get(`[data-cy=movie-image${1}]`)
        .click()
        .get("[data-cy=review-rate]")
        .trigger(5)
        .click();
    });
  });