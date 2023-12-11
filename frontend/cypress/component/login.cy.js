// login.spec.js
/* eslint-disable no-undef */

import React from "react";
import "../../src/index.css";
import { mount } from "cypress/react18";
import { WorkoutContextProvider } from "../../src/context/workoutContext"; // Adjust path
import { AuthContextProvider } from "../../src/context/authContext"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "../../src/pages/login";
import { MemoryRouter } from "react-router-dom";

describe("Login Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <MemoryRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
          <AuthContextProvider>
            <WorkoutContextProvider>
              <Login />
            </WorkoutContextProvider>
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
  });

  it("should display the login form", () => {
    // Check if the form elements are present
    cy.get('[data-testid="email-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="login-button"]').should("exist");
  });

  it("should display error message for invalid credentials", () => {
    // Fill in the login form with invalid credentials
    cy.get('[data-testid="email-input"]').type("invalid@example.com");
    cy.get('[data-testid="password-input"]').type("invalidpassword");

    // Click the login button
    cy.get('[data-testid="login-button"]').click();

    // Check if an error message is displayed
    cy.get('[data-testid="error"]').should("be.visible");
  });

  // Add more tests as needed, such as checking behavior for empty fields, etc.
});
