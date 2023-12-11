// signup.spec.js
/* eslint-disable no-undef */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import "../../src/index.css";
import { mount } from "cypress/react18";
import { WorkoutContextProvider } from "../../src/context/workoutContext";
import { AuthContextProvider } from "../../src/context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "../../src/pages/signup";

describe("Signup Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <MemoryRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
          <AuthContextProvider>
            <WorkoutContextProvider>
              <Signup />
            </WorkoutContextProvider>
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
  });

  it("should display the signup form", () => {
    // Check if the form elements are present
    cy.get('[data-testid="email-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="confirm-password-input"]').should("exist");
    cy.get('[data-testid="username-input"]').should("exist");
    cy.get('[data-testid="signup-button"]').should("exist");
  });

  it("should display error message for mismatched passwords", () => {
    // Fill in the signup form with mismatched passwords
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("testpassword");
    cy.get('[data-testid="confirm-password-input"]').type("mismatchedpassword");

    // Click the signup button
    cy.get('[data-testid="signup-button"]').click();

    // Check if an error message is displayed
    cy.get('[data-testid="error"]')
      .should("be.visible")
      .contains("Passwords do not match");
  });

  // Add more tests as needed, such as checking behavior for empty fields, etc.
});
