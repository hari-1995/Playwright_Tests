const {test,expect} = require('@playwright/test');
//const {Loginpage}= require('./pageobjects/Loginpage').default;
//const {Dashboardpage} = require('./pageobjects/Dashboardpage');
//const {Cartpage} = require('./pageobjects/Cartpage');
const POManager = require('./pageobjects/POManager');
//best way is json to string than to JS object
const DataSet = JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')));
test.only('Shopping website End 2 End Playwright Test', async ({browser}) =>
     {
         
        const context = await browser.newContext();
        const page = await context.newPage();
        const pomanager = new POManager(page);
         const userName = DataSet.username;
         const passWord = DataSet.password;
       // const products =  await page.locator('.card-body');
        const productname = DataSet.productname;

        //Launch the website
        //const loginpage = new Loginpage(page);
        const loginpage = pomanager.getLoginpage();
        await loginpage.goto();
        console.log(await page.title());
        console.log("The application is launched successfully");
         console.log( "The Title of the page --->" + await page.title());

        await loginpage.vlaidlogin(DataSet.username,DataSet.password);
        console.log("Login is successful");
        
        //login
       // await username.fill(email); 
       // await password.fill('Shekar@1995');
       // await login_btn.click();

        //getting the list of all products on the web page
        //await page.locator('.card-body b').first().waitFor();
        //const all_titles = await page.locator('.card-body b').allTextContents();
       // console.log(all_titles);

        //number elements with the given locator
       // await page.locator('.card-body').filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();

        //navigating to cart page
       // await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

       // const dashboardpage = new Dashboardpage(page);
         const dashboardpage = pomanager.getDashboardpage();
        await dashboardpage.searchProduct(DataSet.productname);
        await dashboardpage.navigateToCart();




      // await page.locator("div li").first().waitFor();
       // await expect(page.getByText("ZARA COAT 3")).toBeVisible();

        //clicking on checkout button
       // await page.getByRole("button",{name:"Checkout"}).click();
       //const cartpage = new Cartpage(page);
       const cartpage = pomanager.getCartpage();
       await cartpage.verifyproduct(DataSet.productname);
       await cartpage.clickcheckout();

        //Auto suggestion dropdown 
         await page.getByPlaceholder("Select Country").pressSequentially("ind");
         await page.getByRole("button", {name:"India"}).nth(1).click();

        await expect(page.locator(".user__name label")).toHaveText(DataSet.username);

        //enter CVV
        await page.locator(".field input").nth(1).fill("1995");
        //enter card name
         await page.locator(".field input").nth(2).fill("State Bank");
        //apply coupn
         await page.locator(".field input").nth(3).fill("First Order");
         //apply coupn button
         page.locator('input[name="coupon"]').click();
         console.log("Copun is applied");

         await page.getByText("PLACE ORDER").click();
         console.log("clicked on place order button");
        
        // assert condition to verify the submit page.
         await expect (page.getByText("Thankyou for the order.")).toBeVisible();

        //getting the order id
        const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log("The order id is --->" + orderid);

        //click on order history link
        await page.locator("label[routerlink='/dashboard/myorders']").click();

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
            await expect(billingemail).toHaveText(userName);

        await page.pause();

    });
