const {test,expect, request} = require('@playwright/test');
const {Apicalls} = require('../utils/Apicalls');
const loginpayload = {userEmail: "rr.shekarkumar123@gmail.com", userPassword: "Shekar@1995"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakeorderpayload = {"data":[],"message":"No Orders"};
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
         await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6978fffbc941646b7abe027d",async route=>
    {
        const response = page.request.fetch(route.request());
        let body = JSON.stringify(fakeorderpayload);
        route.fulfill(
            {
                response,
                body,
            }
        );
    }       );


        //click on order history link
        //await page.locator("label[routerlink='/dashboard/myorders']").click();
        await page.getByRole("button", {name: "ORDERS"}).click();

        console.log(await page.locator(".mt-4").textContent());
       
         
        

    });
