describe("Checking Watched Movies", () => {
  it("Checked Movies", () => {
    cy.visit("/");
    cy.get(`[data-cy=timelinedot${1}]`)
      .click()
      .should("have.css", "background-color", "rgb(46, 125, 50)");
  });
  it("Unchecked Movies", () => {
    cy.visit("/");
    cy.get(`[data-cy=timelinedot${1}]`).should(
      "have.css",
      "color",
      "rgb(0, 0, 0)"
    );
  });
});
