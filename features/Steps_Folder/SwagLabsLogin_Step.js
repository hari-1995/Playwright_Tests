const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { before } = require('node:test');
const { chromium } = require('playwright');
const {SwagLoginPage} = require('../../tests/SwagLabsPageObjects/SwagLoginPage');
const { InventoryPage } = require('../../tests/SwagLabsPageObjects/inventoryPage');

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
