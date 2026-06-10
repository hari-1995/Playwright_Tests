Feature: To test the Enrollment functionality of the application

Scenario: To verify the enrollment functionality with valid credentials
    Given Navigate to the application login page
    And Click on the Register Link
    Then user should be navigated to the registration page
    When user enters below information in the registration form
        |Field            | Value                          |
        | Email           | Dynamic_Gmail                |
        | Password        | Green@123456                    |
        | Confirm Password | Green@123456                 |         
    And I click on the Create Account button on the login page
    Then user should be navigated to the home page of the application