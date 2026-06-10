import {test, expect, request} from "@playwright/test";
const loginpayload = {userEmail: "rr.shekarkumar123@gmail.com", userPassword: "Shekar@1995"};
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e680"}]};
let Apiorderid;
let token ;

test.beforeAll( async()=>
{
    //login API
    const Apicontext = await request.newContext();
    const loginresponse= await Apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginpayload
        }
    )
    expect(loginresponse.ok()).toBeTruthy(); // to verify login response is of 200 series
    const loginresponsejson = await loginresponse.json(); //converting response to json format
     token = loginresponsejson.token;
    console.log("The token generated is ------>"+ token);

    //Create product API
    const orderresponse =await Apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderpayload,
            headers:{
                        'Authorization': token,
                        'Content-Type' : 'application/json',
                    },
        })
        const orderresponsejson = await orderresponse.json();
        Apiorderid = orderresponsejson.orders[0];
        console.log("The Order id is ----->" +Apiorderid);

});

test('Brower Context Playwright Test', async ({browser}) =>
     {
        const context = await browser.newContext();
        const page = await context.newPage();
        const username = page.locator('input#username');
        const signin_button = page.locator('#signInBtn');
        const card_titles = page.locator('.card-body a');

      //  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      //  console.log(await page.title());
      //  await username.fill("Rahulshetty");
       // await page.locator("[type='password']").fill("Learning@830$3mK2");
       // await page.locator('#signInBtn').click();

     //  console.log(await page.locator("[style*='block']").textContent());
       // const nameerror = await page.locator("[style*='block']").textContent();
        //expect(nameerror).toContain('Incorrect');

        //await username.fill("");
        //await username.fill("rahulshettyacademy");
        //await signin_button.click();

       // console.log(await card_titles.nth(1).textContent());
       // console.log(await card_titles.first().textContent());
       // await page.waitForLoadState("networkidle");

        page.addInitScript(value =>{
            window.localStorage.setItem('token', value)
        },token);

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");


       await page.locator('.card-body b').first().waitFor();
        const all_titles = await page.locator('.card-body b').allTextContents();
        console.log(all_titles);


        
    });
