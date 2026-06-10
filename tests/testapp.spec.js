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
        const productname = 'ZARA COAT 3';
        await page.locator('.card-body b').first().waitFor();
        const all_titles = await page.locator('.card-body b').allTextContents();
        console.log(all_titles);

        //number elements with the given locator
        const count = await products.count();
        for(let i=0; i< count; i++)
        {
            //if(await products.nth(i).textContent() == productname)
             if(await products.nth(i).locator("b").textContent() == productname)
                {
                console.log("The Desired product is ---> " + productname);
            
                //Add to Cart  Add To Cart
                 await products.nth(i).locator("text= Add To Cart").click();
                 break;
                }
        }
        //navigating to cart page
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();

        //clicking on checkout button
        await page.locator('button:has-text("Checkout")').click();

        //Auto suggestion dropdown 
        await page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropdown = await page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();

        console.log("The Number of options --->" +optionsCount )

        for (let i = 0; i < optionsCount; i++)
        {
           const text = await dropdown.locator("button").nth(i).textContent();
           console.log("The options in the dropdown are ----->" + i+"." + text)
           if(text.trim() == "India")
           {
                await dropdown.locator("button").nth(i).click();
                break;
           }
        }

        await expect( page.locator(".user__name label")).toHaveText(email);

        //enter CVV
        await page.locator(".field input").nth(1).fill("1995");
        //enter card name
         await page.locator(".field input").nth(2).fill("State Bank");
        //apply coupn
         await page.locator(".field input").nth(3).fill("First Order");
         //apply coupn button
         page.locator('input[name="coupon"]').click();
         console.log("Copun is applied");

         await page.locator(".action__submit").click();
         console.log("clicked on place order button");
        
        // assert condition to verify the submit page.
         await expect (page.locator(".hero-primary")).toHaveText("Thankyou for the order.");

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
            await expect(billingemail).toHaveText(email);


    });
