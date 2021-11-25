describe("Write Review", () => {
  it("click movie and write review", () => {
    cy.visit("/");

    cy.get(`[data-cy=movie-image${1}]`)
      .click()
      .get("[data-cy=review-input]")
      .type("This is my review")
      .get("[data-cy=submit]")
      .click();
  });

  //   it("login", () => {
  //     cy.visit("/");
  //     cy.get(`[data-cy=login]`)
  //       .click()
  //       .get("#identifierId")
  //       .type("carolynmperniciaro@gmail.com");
  //   });
});
