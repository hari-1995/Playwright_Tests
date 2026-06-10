const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { before } = require('node:test');
const { chromium } = require('playwright');

Given('Navigate to the application login page', async function () {
           const browser = await chromium.launch(
            {
                headless: false
            }
           );
           const context = await browser.newContext();
           this.page = await context.newPage();
           await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
           console.log("The application is landed on Login page successfully");
         });

Given('Click on the Register Link', async function () {
            await this.page.getByRole('link', { name: 'Register' }).click();
           this.page.waitForLoadState('networkidle');
           console.log("The Register link is clicked successfully");
         });

Then('user should be navigated to the registration page', async function () {
           await this.page.waitForLoadState('networkidle');       
           let url = await this.page.url();
           expect(url).toContain('register');
          console.log("The application is landed on Registration page successfully");
         });

When('user enters below information in the registration form', async function (dataTable) {
            const data = dataTable.rowsHash();
            const randomNumber = Math.floor(10000 + Math.random() * 90000);
            const dynamicEmail = `user${randomNumber}@gmail.com`;
            if (data.Email === 'Dynamic_Gmail') {
                data.Email = dynamicEmail;
            }
            console.log("The Dynamic email generated is: " + dynamicEmail); 
            for (const Field in data) {
                const value = data[Field];
                switch (Field) {
                    case 'Email':
                        await this.page.getByRole('textbox', { name: 'you@email.com' }).fill(value);
                        break;
                    case 'Password':
                        await this.page.getByRole('textbox', { name: 'Min 8 chars, uppercase, number & symbol' }).fill(value);
                        break;
                    case 'Confirm Password':
                        await this.page.getByRole('textbox', { name: 'Repeat your password' }).fill(value);
                        break;
                    
            }
          }
           console.log("User entered registration information");
         });

         
 When('I click on the Create Account button on the login page', async function () {
          await this.page.getByRole('button', { name: 'Create Account' }).click(); 
          await this.page.waitForLoadState('networkidle');
          console.log("Create Account button is clicked");
         });

Then('user should be navigated to the home page of the application', async function () {
          await this.page.waitForLoadState('networkidle');
          const homebutton = await this.page.locator("#nav-home"); 
          expect(homebutton).toBeVisible();    
          console.log("The application is landed on Home page successfully");
         });