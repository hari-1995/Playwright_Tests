const {test,expect} = require('@playwright/test');

      const email = 'rr.shekarkumar123@gmail.com';
      let webContext;


test.beforeAll(async ({browser}) =>{
        
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        console.log( "The Title of the page --->" + await page.title());
        
        const username = await page.locator('#userEmail');
        const password =  await page.locator('#userPassword');
        const login_btn = await page.locator('#login');

        //login
        await username.fill(email); 
        await password.fill('Shekar@1995');
        await login_btn.click();

        //getting the list of all products on the web page
        await page.waitForLoadState('networkidle');
        await context.storageState({path: 'state.json'});
         webContext = await browser.newContext({storageState: 'state.json'}); 

});

test('Shopping website End 2 End Playwright Test', async () =>
     {
        const page = await webContext.newPage();
            //Launch the website
        await page.goto("https://rahulshettyacademy.com/client");
        
        const products =  await page.locator('.card-body');
        await page.locator('.card-body b').first().waitFor();
        const all_titles = await page.locator('.card-body b').allTextContents();
        console.log(all_titles);
    });

    test('Shopping website click on orders Playwright Test', async () =>
     {
        const page = await webContext.newPage();
            //Launch the website
        await page.goto("https://rahulshettyacademy.com/client");
         await page.getByRole("button", {name: "ORDERS"}).click();
         console.log(await page.url());
        
    });

    test('Shopping website click on cart Playwright Test', async () =>
     {
        const page = await webContext.newPage();
            //Launch the website
        await page.goto("https://rahulshettyacademy.com/client");
         await page.getByRole("button", {name: "Cart"}).first().click();
         console.log(await page.url());
        
    });