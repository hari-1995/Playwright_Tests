const {test,expect, request} = require('@playwright/test');
const loginpayload = {userEmail: "rr.shekarkumar123@gmail.com", userPassword: "Shekar@1995"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let token;
let orderid;

test.beforeAll(async () =>
    {
         const apiContext =  await request.newContext();
        const login_Response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
               data: loginpayload
            }
         )
      expect(login_Response.ok())
      const login_ResponseJson = await login_Response.json();
      token = login_ResponseJson.token;

//------------------oder creation api----------------------
        const oderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
         {
            data: orderpayload,
            headers : {
                        'Authorization': token,
                        'Content-Type' : 'application/json',
                      }, 
         }
        )
        const oderResponseJson = await oderResponse.json();
        orderid = oderResponseJson.orders[0];
        console.log("The order id is ----->" + orderid);          

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
        }, token);

      await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      console.log("The token is --->" + token);


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
         if(orderid.includes(roworderid))
            {
               //click on view button
               await rows.nth(i).locator("button").first().click();
               break;
            }
        }

         //assert condition for order details
            const oderdetails = await page.locator(".col-text").textContent();
            expect(orderid.includes(oderdetails)).toBeTruthy();

            //assert condition for email id on confirmation page
            const billingemail = await page.locator('div.address').locator('p').first();
            console.log("The billing email is --> "+ await billingemail.textContent());
            await expect(billingemail).toHaveText(email);


    });
