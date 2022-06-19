// https://docs.cypress.io/api/table-of-contents

describe("test quiz app", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "QUIZBOX");
  });
});
