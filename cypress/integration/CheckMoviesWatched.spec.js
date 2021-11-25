describe("Checking Watched Movies", () => {
  it("Checked Movies", () => {
    cy.visit("/");
    cy.get("[data-cy=timelinedot]")
      .click({ force: true, multiple: true })
      .should("have.css", "color", "rgb (46, 125, 50)");
  });
  it("Unchecked Movies", () => {
    cy.visit("/");
    cy.get("[data-cy=timelinedot]").should(
      "have.css",
      "color",
      "rgb(255, 255, 255)"
    );
  });
});
