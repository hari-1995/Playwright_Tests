Feature: To Test the Login Functionality of the E-commerce Website

  @SmokeTest
  Scenario: To verify the login functionality with valid credentials
    Given I am on the login page of the e-commerce website
    When I enter valid "rr.shekarkumar123@gmail.com" and "Shekar@195"
    And I click on the login button
    Then I should be redirected to the homepage

  @Validation
  Scenario Outline: To verify the login functionality with invalid credentials
    Given I am on the login page of the data website
    When I enter invalid "<username>" and "<password>"
    And I click on the login button on the login page
    Then error message should be displayed on the login page

    Examples:
        | username        | password          |
        | rahulshetty     | Learning@830$3mK2 |
        |  hari           | Krishna@1995      |

    
