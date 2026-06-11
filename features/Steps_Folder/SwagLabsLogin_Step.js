const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { before } = require('node:test');
const { chromium } = require('playwright');
const {SwagLoginPage} = require('../../tests/SwagLabsPageObjects/SwagLoginPage');
const { InventoryPage } = require('../../tests/SwagLabsPageObjects/inventoryPage');
const { ProductsPage } = require('../../tests/SwagLabsPageObjects/Productspage');
const { CartPage } = require('../../tests/SwagLabsPageObjects/CartPage');
const { CheckoutPage } = require('../../tests/SwagLabsPageObjects/CheckoutPage');

Given('I am on the login page of the Swag Labs website',{timeout: 100*1000},async function () {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.SwagLoginPageObj = new SwagLoginPage(this.page);
    await this.SwagLoginPageObj.goto();
    console.log('The application is landed on Swag Labs Login page successfully');
});

When('I enter swag labs valid {string} and {string}', async function (username, password) {
    await this.SwagLoginPageObj.EnterloginDetails(username, password);
});

When('I click on the login button on the swag labs login page', async function () {
    await this.SwagLoginPageObj.clickLoginButton();
});

Then('I should be redirected to the inventory page of the Swag Labs website', async function () {
    await this.SwagLoginPageObj.titleverification();
});

Then('Get all the list of products displayed on the inventory page and print them in the console', async function () {
    
    this.inventoryPageObj = new InventoryPage(this.page);
    await this.inventoryPageObj.getProductsList();
});

Then('from the List select the product {string} and click on it', async function (productName) {
    await this.inventoryPageObj.selectProduct(productName);
});

Then('I should be redirected to the product details page of the selected product', async function () {
    this.productsPageObj = new ProductsPage(this.page);
    await this.productsPageObj.verifyProductDetailsPage();
});

Then('I click on the add to cart button on the product details page', async function () {
    await this.productsPageObj.clickAddToCart();
});
    
Then('The product should be added to the cart', async function () {
           await this.productsPageObj.verifyProductAddedToCart();
         });

Then('Click on the cart icon', async function () {
           this.cartPageObj = new CartPage(this.page);
           await this.cartPageObj.clickCartIcon();
         });

Then('your navigated to cart page', async function () {
           await this.cartPageObj.VerifyCartPage();
         });

Then('Click on the checkout button', async function () {
           await this.cartPageObj.clickCheckoutButton();
         });

Then('Your navigated to checkout page', async function () {
           this.checkoutPageObj = new CheckoutPage(this.page);
           await this.checkoutPageObj.VerifyCheckoutPage();
         });