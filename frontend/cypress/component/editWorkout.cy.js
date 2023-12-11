/* eslint-disable no-undef */
// bmiCalculator.spec.js

import React from "react";
import "../../src/index.css";
import { mount } from "cypress/react18";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import EditWorkout from "../../src/components/EditWorkout";
import { WorkoutContextProvider } from "../../src/context/workoutContext"; // Adjust path
import { AuthContextProvider } from "../../src/context/authContext"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("EditWorkout Component", () => {
  const mockWorkout = {
    _id: "123",
    title: "Sample Workout",
    load: 50,
    reps: 10,
    sets: 3,
  };

  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
        <AuthContextProvider>
          <WorkoutContextProvider>
            <EditWorkout workout={mockWorkout} />
          </WorkoutContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    );
  });

  it("should display the form elements with pre-filled workout data", () => {
    // Check if the form elements are present and have the correct values
    cy.get('input[name="title"]').should("have.value", "Sample Workout");
    cy.get('input[name="load"]').should("have.value", "50");
    cy.get('input[name="reps"]').should("have.value", "10");
    cy.get('input[name="sets"]').should("have.value", "3");
  });

  it("should show an error message when submitting without filling out all fields", () => {
    // Submit the form without filling out all fields
    cy.get('[data-testid="submit"]').click();

    // Check if the error message is displayed
    cy.get(".errorDiv").should("be.visible");
  });

  it("should show an error message when not logged in", () => {
    // Stub the API call for successful workout edit
    cy.intercept("PATCH", "http://localhost:4000/api/workouts/123", {
      statusCode: 200,
      body: {
        _id: "123",
        title: "Edited Workout",
        load: 60,
        reps: 12,
        sets: 4,
      },
    }).as("editWorkout");

    // Fill out the form with new values
    cy.get('input[name="load"]').clear().type("60");
    cy.get('input[name="reps"]').clear().type("12");
    cy.get('input[name="sets"]').clear().type("4");

    // Submit the form
    cy.get('[data-testid="submit"]').click();

    cy.get(".errorDiv").should("be.visible");
  });
});
