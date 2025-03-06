/// <reference types="cypress" />

describe("Instagram Story Viewer - Mobile", () => {
  beforeEach(() => {
    // Set viewport to a common mobile resolution
    cy.viewport(390, 844); // iPhone 14 Pro (You can change this if needed)

    // Intercept API request going to localhost instead of the external API
    cy.intercept("GET", "/v2/list*", { fixture: "stories.json" }).as("fetchStories");

    // Visit the localhost app
    cy.visit("http://localhost:5173"); // Change this to your actual localhost port

    // Wait for the API call
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
    cy.get(".story").first().click(); // Open the first story
    cy.get(".story-viewer", { timeout: 14000 }).should("be.visible"); // Ensure viewer opens

    // Get the image and click on the RIGHT SIDE
    cy.get(".story-image")
      .should("be.visible")
      .then(($img) => {
        const imgWidth = $img.width() || 200; // Default width if undefined
        const clickX = imgWidth * 0.8; // Click 80% to the right
        cy.wrap($img).click(clickX, 50); // Click towards the right side
      });

    cy.get(".story-image", { timeout: 14000 }).should("exist"); // Ensure new story loads
  });

  it("should navigate to the previous story", () => {
    cy.get(".story").eq(1).click(); // Open second story
    cy.get(".story-viewer", { timeout: 14000 }).should("be.visible");

    // Click on the LEFT SIDE of the image to go back
    cy.get(".story-image")
      .should("be.visible")
      .then(($img) => {
        const imgWidth = $img.width() || 200;
        const clickX = imgWidth * 0.2; // Click 20% from the left
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
