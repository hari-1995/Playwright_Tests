const {test,expect, request} = require('@playwright/test');
const {Apicalls} = require('../utils/Apicalls');
const loginpayload = {userEmail: "rr.shekarkumar123@gmail.com", userPassword: "Shekar@1995"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll(async () =>
    {
         const apiContext =  await request.newContext();
         const apicalls = new Apicalls(apiContext,loginpayload);
          response = await apicalls.getorderid(orderpayload);

    });





test('Shopping website End 2 End Playwright Test', async ({page}) =>
     {
        //const context = await browser.newContext();
        //const page = await context.newPage();
        const email = 'rr.shekarkumar123@gmail.com';
        const username =  await page.locator('#userEmail');
        const password =  await page.locator('#userPassword');
        const login_btn = await page.locator('#login');
        const products =  await page.locator('.card-body');
        const productname = 'ZARA COAT 3';

//-------------------login api----------------------
        page.addInitScript(value =>{
            window.localStorage.setItem('token', value);
        }, response.token);

      await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      await page.waitForLoadState('networkidle');


//------------------------------------------------------------------------


//------------------------------------------------------------------------


        //click on order history link
        //await page.locator("label[routerlink='/dashboard/myorders']").click();
        await page.getByRole("button", {name: "ORDERS"}).click();

        //waiting for the table to be visibile
        await page.locator(".table").waitFor();
         
        //getting table rows
        const rows =  await page.locator("tbody tr");
         
        for (let i=0; i< await rows.count(); i++)
        {
         const roworderid = await rows.nth(i).locator("th").textContent();
         if(response.orderid.includes(roworderid))
            {
               //click on view button
               await rows.nth(i).locator("button").first().click();
               break;
            }
        }

         //assert condition for order details
            const oderdetails = await page.locator(".col-text").textContent();
            expect(response.orderid.includes(oderdetails)).toBeTruthy();

            //assert condition for email id on confirmation page
            const billingemail = await page.locator('div.address').locator('p').first();
            console.log("The billing email is --> "+ await billingemail.textContent());
            await expect(billingemail).toHaveText(email);


    });
