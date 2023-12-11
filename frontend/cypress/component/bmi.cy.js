/* eslint-disable no-undef */
// bmiCalculator.spec.js

import React from "react";
import "../../src/index.css";
import { mount } from "cypress/react18";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import BmiCalculator from "../../src/components/BmiCalculator";
import { WorkoutContextProvider } from "../../src/context/workoutContext"; // Adjust path
import { AuthContextProvider } from "../../src/context/authContext"; // Adjust path
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("BMI Calculator Component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    mount(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
        <AuthContextProvider>
          <WorkoutContextProvider>
            <BmiCalculator />
          </WorkoutContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    );
  });

  // it("should calculate BMI and show result", () => {
  //   // Stubbing the API call
  //   cy.intercept("POST", "http://localhost:4000/api/calculate/bmi").as(
  //     "calculateBMI"
  //   );

  //   // Enter details in the form
  //   cy.get('input[name="height"]').type("170");
  //   cy.get('input[name="weight"]').type("70");
  //   cy.get('input[name="age"]').type("25");
  //   cy.get('[data-testid="sex"] input[type="radio"]').check({
  //     force: true,
  //   });

  //   // Submit the form
  //   cy.get('[data-testid="btn"] button').click();

  //   // Wait for the API call to complete
  //   cy.wait("@calculateBMI");

  //   // Check if the BMI result is displayed
  //   cy.get('[data-bmiresult="bmi-result"]').should("be.visible");
  // });

  it("should display the form elements", () => {
    // Check if the form elements are present
    cy.get('input[name="height"]').should("exist");
    cy.get('input[name="weight"]').should("exist");
    cy.get('input[name="age"]').should("exist");
    cy.get('[data-testid="sex"]').should("exist");
    cy.get('[data-testid="btn"] button').should("exist");
  });

  it("should show an error message when submitting without filling the form", () => {
    // Submit the form without filling the details
    cy.get('[data-testid="btn"] button').click();

    // Check if the error message is displayed
    cy.get(".errorDiv").should("be.visible");
  });

  it("should show an error message when not logged in", () => {
    // Do not login

    // Enter details in the form
    cy.get('input[name="height"]').type("170");
    cy.get('input[name="weight"]').type("70");
    cy.get('input[name="age"]').type("25");
    cy.get('[data-testid="sex"] input[type="radio"]').check({
      force: true,
    });

    // Submit the form
    cy.get('[data-testid="btn"] button').click();

    // Check if the error message is displayed
    cy.get(".errorDiv").should("be.visible");
  });
});
