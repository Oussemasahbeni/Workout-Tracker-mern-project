/* eslint-disable no-undef */
// workoutDetails.spec.js

import React from "react";
import "../../src/index.css";
import { mount } from "cypress/react18";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import WorkoutDetails from "../../src/components/workoutDetails";
import { WorkoutContextProvider } from "../../src/context/workoutContext"; // Adjust path
import { AuthContextProvider } from "../../src/context/authContext"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("WorkoutDetails Component", () => {
  const sampleWorkout = {
    _id: "1",
    title: "Sample Workout",
    load: 30,
    reps: 10,
    sets: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
        <AuthContextProvider>
          <WorkoutContextProvider>
            <WorkoutDetails workout={sampleWorkout} />
          </WorkoutContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    );
  });

  it("should display workout details", () => {
    // Check if the workout details are displayed correctly
    cy.get('[data-testid="workout-list"]').should("exist");
    cy.contains("Sample Workout").should("exist");
    cy.contains("Load(kg): 30").should("exist");
    cy.contains("Reps: 10").should("exist");
    cy.contains("Sets: 3").should("exist");
    cy.contains("less than a minute ago").should("exist");
  });

  it("should open and close the delete confirmation dialog", () => {
    // Open the delete confirmation dialog
    cy.get('[data-testid="delete-button"]').click();

    // Check if the dialog is visible
    cy.get('[data-test="delete-dialog"]').should("exist");

    // Close the delete confirmation dialog
    cy.get('[data-pc-section="closebutton"]').click({ force: true });

    // Check if the dialog is closed
    cy.get('[data-pc-section="closebutton"]').should("not.exist");
  });
});
