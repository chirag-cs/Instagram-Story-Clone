/// <reference types="cypress" />

describe("Instagram Story Viewer - Mobile", () => {
  beforeEach(() => {
    
    cy.viewport(390, 844); 

    cy.intercept("GET", "/v2/list*", { fixture: "stories.json" }).as("fetchStories");

    cy.visit("http://localhost:5173"); 

    cy.wait("@fetchStories", { timeout: 10000 });
  });

  it("should display stories on the homepage", function () {
    cy.get(".story", { timeout: 10000 }).should("have.length.at.least", 1);
  });

  it("should open a story when clicked", () => {
    cy.get(".story").first().click();
    cy.get(".story-viewer").should("be.visible");
  });

  it("should navigate to the next story", () => {
    cy.get(".story").first().click(); 
    cy.get(".story-viewer", { timeout: 14000 }).should("be.visible"); 

    cy.get(".story-image")
      .should("be.visible")
      .then(($img) => {
        const imgWidth = $img.width() || 200; 
        const clickX = imgWidth * 0.8; 
        cy.wrap($img).click(clickX, 50); 
      });

    cy.get(".story-image", { timeout: 14000 }).should("exist"); 
  });

  it("should navigate to the previous story", () => {
    cy.get(".story").eq(1).click(); 
    cy.get(".story-viewer", { timeout: 14000 }).should("be.visible");

    cy.get(".story-image")
      .should("be.visible")
      .then(($img) => {
        const imgWidth = $img.width() || 200;
        const clickX = imgWidth * 0.2; 
        cy.wrap($img).click(clickX, 50);
      });

    cy.get(".story-image", { timeout: 14000 }).should("exist");
  });

  it("should close the story viewer", () => {
    cy.get(".story").first().click();
    cy.get(".close-btn").click();
    cy.get(".story-viewer").should("not.exist");
  });
});
