Feature: Swag Labs Login Testing

    Scenario: To test the login functionality of the Swag Labs website with valid credentials
        Given I am on the login page of the Swag Labs website
        When I enter swag labs valid "standard_user" and "secret_sauce"
        And I click on the login button on the swag labs login page
        Then I should be redirected to the inventory page of the Swag Labs website
        Then Get all the list of products displayed on the inventory page and print them in the console
        Then from the List select the product "Sauce Labs Backpack" and click on it
        Then I should be redirected to the product details page of the selected product   
        And I click on the add to cart button on the product details page
        Then The product should be added to the cart
        And Click on the cart icon 
        And your navigated to cart page
        Then Click on the checkout button
        Then Your navigated to checkout page
        And Enter First Name as "Hari" last name as "Krishna" and postal code as "500013"
        Then Click on the continue button
        Then Your navigated to checkout overview page

