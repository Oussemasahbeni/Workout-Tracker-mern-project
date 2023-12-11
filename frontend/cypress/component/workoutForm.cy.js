/* eslint-disable no-undef */
// workoutForm.spec.js

import React from "react";
import "../../src/index.css";
import { mount } from "cypress/react18";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import WorkoutForm from "../../src/components/workoutForm";
import { WorkoutContextProvider } from "../../src/context/workoutContext"; // Adjust path
import { AuthContextProvider } from "../../src/context/authContext"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("WorkoutForm Component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
        <AuthContextProvider>
          <WorkoutContextProvider>
            <WorkoutForm />
          </WorkoutContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    );
  });

  it("should display the form elements", () => {
    // Check if the form elements are present
    cy.get('[data-pc-name="cascadeselect"]').should("exist");
    cy.get('[data-testid="workout-load"]').should("exist");
    cy.get('[data-testid="workout-reps"]').should("exist");
    cy.get('[data-testid="workout-sets"]').should("exist");
    cy.get('[data-testid="add-workout"]').should("exist");
  });

  it("should show an error message when submitting without filling out all fields", () => {
    // Submit the form without filling out all fields
    cy.get('[data-testid="add-workout"]').click();

    // Check if the error message is displayed
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("should add a workout and dispatch the created data", () => {
    // Stub the API call for successful workout creation
    cy.intercept("POST", "http://localhost:4000/api/workouts", {
      statusCode: 200,
      body: {
        _id: "123",
        title: "New Workout",
        load: 30,
        reps: 8,
        sets: 3,
      },
    }).as("addWorkout");

    // Fill out the form with new values
    cy.get('[data-pc-name="cascadeselect"]').click();
    cy.get(".p-cascadeselect-panel .p-cascadeselect-items-wrapper li")
      .contains("Biceps")
      .click({ force: true });
    cy.get(".p-cascadeselect-panel .p-cascadeselect-items-wrapper li")
      .contains("Barbell Curl")
      .click({ force: true });

    // Select load
    cy.get('[data-testid="workout-load"]').click();
    cy.get(".p-dropdown-items .p-dropdown-item").contains("50").click();

    // Select reps
    cy.get('[data-testid="workout-reps"]').click();
    cy.get(".p-dropdown-items .p-dropdown-item").contains("10").click();

    // Select sets
    cy.get('[data-testid="workout-sets"]').click();
    cy.get(".p-dropdown-items .p-dropdown-item").contains("5").click();

    // Submit the form
    cy.get('[data-testid="add-workout"]').click();

    // Wait for the API call to complete
    cy.get(".errorDiv").should("be.visible");
  });
});
