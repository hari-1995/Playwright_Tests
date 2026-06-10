const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { before } = require('node:test');
const { chromium } = require('playwright');

Given('I am on the login page of the e-commerce website',{timeout: 100*1000} , async function () {
           const browser = await chromium.launch(
            {
                headless: false
            }
           );
           const context = await browser.newContext();
           this.page = await context.newPage();
           await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
           await this.page.waitForLoadState('networkidle');
           console.log("The application is landed on Login page successfully");});

When('I enter valid {string} and {string}', async function (username, password) {
        await this.page.getByPlaceholder("you@email.com").fill(username);
        await this.page.getByRole("textbox",{name: "password"}).fill(password);           
});

When('I click on the login button', async function () {
           await this.page.getByRole("button",{name: "Sign In"}).click();
           console.log("The application is launched successfully");
            await this.page.waitForLoadState('networkidle');
         });

Then('I should be redirected to the homepage', async  function () {
            console.log("Title of the page is  --->" + await this.page.title());
            expect(await this.page.title()).toBe("EventHub — Discover & Book Events");   
            await this.page.locator("#logout-btn").click();
            console.log("The user is logged out successfully");
         });

Given('I am on the login page of the data website',{timeout: 100*1000} , async function () {
        const browser = await chromium.launch(
            {
                headless: false
            }
           );
           const context = await browser.newContext();
           this.page = await context.newPage();
           await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
           await this.page.waitForLoadState('networkidle');
           console.log("The application is landed on Login page successfully");});

 When('I enter invalid {string} and {string}', async function (username, password) {
           
           await this.page.locator('input#username').fill(username);
           await this.page.locator("[type='password']").fill(password);
         });  
         
When('I click on the login button on the login page', async function () {
           await this.page.locator('#signInBtn').click();
         });

Then('error message should be displayed on the login page', async function () {
           console.log(await this.page.locator("[style*='block']").textContent());
           const nameerror = await this.page.locator("[style*='block']").textContent();
           expect(nameerror).toContain('Incorrect');
         });