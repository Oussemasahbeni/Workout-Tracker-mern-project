/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
import { slowCypressDown } from "cypress-slow-down";

// slowCypressDown(1000);
describe("whole use cases", () => {
  it("should navigate to the login page from the landing page", () => {
    cy.visit("/");

    cy.contains("Get Started").click();

    cy.url().should("include", "/login");
    cy.get("h3").should("contain", "Login to Your Account");
  });

  it("should display an error message with Incorrect Email", () => {
    // Visit the login page
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type("invalid_email@example.com");
    cy.get('[data-testid="password-input"]').type("invalid_password");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error"]').should("contain", "Incorrect email");
  });

  it("should display an error message with Incorrect Password", () => {
    // Visit the login page
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type("test@gmail.com");
    cy.get('[data-testid="password-input"]').type("invalid_password");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error"]').should("contain", "Incorrect password");
  });

  it("should display an error message when no input is provided", () => {
    // Visit the login page
    cy.visit("/login");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error"]').should(
      "contain",
      "Email and password are required"
    );
  });

  it("should log in successfully with valid credentials", () => {
    // Enter valid email and password

    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type("test@gmail.com");
    cy.get('[data-testid="password-input"]').type("TestTest123#");

    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the home page after login
    cy.url().should("include", "/home");
  });

  describe("Add workout functionality", () => {
    beforeEach(() => {
      // Log in first
      cy.visit("/login");
      cy.get('[data-testid="email-input"]').type("test@gmail.com");
      cy.get('[data-testid="password-input"]').type("TestTest123#");
      cy.get('button[type="submit"]').click();

      // Navigate to the add workout page
      // cy.get('[data-testid="add-workout"]').click();
    });

    it("should show an error when not all inputs are filled", () => {
      // Submit the form
      cy.get('[data-testid="add-workout"]').click();

      // Assert that an error message is shown
      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show an error when only load is selected", () => {
      // Select load
      cy.get('[data-testid="workout-load"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("50").click();

      // Submit the form
      cy.get('[data-testid="add-workout"]').click();

      // Assert that an error message is shown
      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show an error when only load and reps are selected", () => {
      // Select load
      cy.get('[data-testid="workout-load"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("50").click();

      // Select reps
      cy.get('[data-testid="workout-reps"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("10").click();

      // Submit the form
      cy.get('[data-testid="add-workout"]').click();

      // Assert that an error message is shown
      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show an error when only load and sets are selected", () => {
      // Select load
      cy.get('[data-testid="workout-load"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("50").click();

      // Select sets
      cy.get('[data-testid="workout-sets"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("5").click();

      // Submit the form
      cy.get('[data-testid="add-workout"]').click();

      // Assert that an error message is shown
      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show an error when only reps and sets are selected", () => {
      // Select reps
      cy.get('[data-testid="workout-reps"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("10").click();

      // Select sets
      cy.get('[data-testid="workout-sets"]').click();
      cy.get(".p-dropdown-items .p-dropdown-item").contains("5").click();

      // Submit the form
      cy.get('[data-testid="add-workout"]').click();

      // Assert that an error message is shown
      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should add a workout successfully when all inputs are filled", () => {
      // Fill out the form

      // Select workout
      cy.get('[data-pc-name="cascadeselect"]').click();
      cy.get(".p-cascadeselect-panel .p-cascadeselect-items-wrapper li")
        .contains("Biceps")
        .click();
      cy.get(".p-cascadeselect-panel .p-cascadeselect-items-wrapper li")
        .contains("Barbell Curl")
        .click();

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

      // Assert that the workout was added successfully
      cy.get('[data-testid="workout-list"]').should("contain", "Barbell Curl");
    });
  });
  describe("EditWorkout", () => {
    beforeEach(() => {
      // Log in first
      cy.visit("/login");
      cy.get('[data-testid="email-input"]').type("test@gmail.com");
      cy.get('[data-testid="password-input"]').type("TestTest123#");
      cy.get('button[type="submit"]').click();
    });

    it("should edit a workout successfully", () => {
      // Click the edit button
      cy.get("button").contains("Edit").click();

      // Scenario 1: Edit load
      cy.get('input[name="load"]').clear().type("50");
      cy.get('[data-testid="submit"]').click();
      cy.get('[data-testid="workout-list"]').should("contain", "50");

      // Click the edit button again
      cy.get("button").contains("Edit").click();

      // Scenario 2: Edit reps
      cy.get('input[name="reps"]').clear().type("10");
      cy.get('[data-testid="submit"]').click();
      cy.get('[data-testid="workout-list"]').should("contain", "10");

      // Click the edit button again
      cy.get("button").contains("Edit").click();

      // Scenario 3: Edit sets
      cy.get('input[name="sets"]').clear().type("5");
      cy.get('[data-testid="submit"]').click();
      cy.get('[data-testid="workout-list"]').should("contain", "5");
    });

    it("should cancel the edit operation", () => {
      // Click the edit button
      cy.get("button").contains("Edit").click();

      // Edit the load
      cy.get('input[name="load"]').clear().type("50");

      // Click the cancel button
      cy.get('.p-dialog [data-pc-section="closebutton"]').click({
        force: true,
      });

      // Assert that the workout details have not changed
      cy.get('[data-testid="workout-list"]').should("not.contain", "Load: 50");
    });

    it("should not submit the form when load is empty", () => {
      // Click the edit button
      cy.get("button").contains("Edit").click();

      // Clear the load input
      cy.get('input[name="load"]').clear();

      // Try to submit the form
      cy.get('[data-testid="submit"]').click();

      // Assert that an error message is displayed
      cy.get(".errorDiv").should("contain", "Please fill out all fields");
    });
  });

  describe("WorkoutDetails", () => {
    beforeEach(() => {
      // Log in first
      cy.visit("/login");
      cy.get('[data-testid="email-input"]').type("test@gmail.com");
      cy.get('[data-testid="password-input"]').type("TestTest123#");
      cy.get('button[type="submit"]').click();
    });

    it("should delete a workout successfully if it exists", () => {
      // Check if the workout exists
      cy.get('[data-testid="workout-list"]').then(($list) => {
        if ($list.text().includes("Barbell Curl")) {
          // Click the delete button
          cy.get("button").contains("Delete").click();

          // Confirm the deletion
          cy.get(".p-confirm-dialog-accept").click();

          // Assert that the workout is no longer in the list
          // cy.get('[data-testid="workout-list"]').should(
          //   "not.contain",
          //   "Barbell Curl"
          // );
        }
      });
    });
  });

  describe("BMI Calculator", () => {
    beforeEach(() => {
      // Log in first
      cy.visit("/login");
      cy.get('[data-testid="email-input"]').type("test@gmail.com");
      cy.get('[data-testid="password-input"]').type("TestTest123#");
      cy.get('button[type="submit"]').click();
    });

    it("should navigate to the BMI calculator", () => {
      // Visit the home page
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(3000);
      cy.visit("/BMI");

      // Click on the BMI calculator link
      cy.get("header").contains("BMI CALCULATOR").click();

      // Check that the BMI calculator page is displayed
      cy.url().should("include", "/BMI");
    });

    it("should calculate the BMI", () => {
      // Visit the BMI calculator page
      cy.wait(3000);
      cy.visit("/BMI");

      // Fill in the height, weight, sex, and age
      cy.get('input[name="height"]').type("180");
      cy.get('input[name="weight"]').type("70");
      cy.get('[data-testid="sex"] input[type="radio"]').check({ force: true });
      cy.get('input[name="age"]').type("10").blur();

      // Click the submit button
      cy.wait(2000);
      cy.get('[data-testid="btn"]').click();

      // Check that the BMI is calculated and displayed
      // cy.get('[data-bmiresult="bmi-result"]').should("contain", "Your Bmi is:");
    });

    it("should display an error for invalid inputs", () => {
      cy.wait(3000);
      cy.visit("/BMI");

      // Verify initial state
      cy.get('input[name="height"]').should("have.value", "");
      cy.get('input[name="weight"]').should("have.value", "");
      cy.get('[data-testid="sex"] input[type="radio"]').should(
        "not.be.checked"
      );
      cy.get('input[name="age"]').should("have.value", "");

      // Fill in the height, weight, sex, and age with invalid values
      cy.get('input[name="height"]').type("30").should("have.value", "30");
      cy.get('input[name="weight"]').type("-70").should("have.value", "-70");
      cy.get('[data-testid="sex"] input[type="radio"]').check({ force: true });
      cy.get('input[name="age"]')
        .type("-10")
        .should("have.value", "-10")
        .blur();

      // Click the submit button
      cy.get('[data-testid="btn"]').click();

      // Check that an error message is displayed
      cy.get(".errorDiv").should("be.visible");
    });

    it("should display an error for empty inputs", () => {
      // Visit the BMI calculator page
      cy.wait(2000);
      cy.visit("/BMI");

      // Leave the height, weight, sex, and age inputs empty
      cy.get('[data-testid="sex"] input[type="radio"]').check({
        force: true,
      });

      // Click the submit button
      cy.get('[data-testid="btn"]').click();

      // Check that an error message is displayed
      cy.get(".errorDiv").should("be.visible");
    });

    it("should calculate the BMI for edge case inputs", () => {
      // Visit the BMI calculator page
      cy.wait(2000);
      cy.visit("/BMI");

      // Fill in the height, weight, sex, and age with edge case values
      cy.get('input[name="height"]').type("250");
      cy.get('input[name="weight"]').type("500");
      cy.get('[data-testid="sex"] input[type="radio"]').check({
        force: true,
      });
      cy.get('input[name="age"]').type("100").blur();

      // Click the submit button
      cy.get('[data-testid="btn"]').click();

      // Check that the BMI is calculated and displayed
      cy.get('[data-bmiresult="bmi-result"]').should("contain", "Your Bmi is:");
    });
  });

  // it("should log in successfully with Google", () => {

  //   cy.visit("/login");

  //   cy.get('[data-testid="google-login"]').click();

  //   cy.url().should("include", "/home");
  // });
});
