const{test, expect}  = require('@playwright/test');


test(" [@object] Parent-Child window Playwright Test", async ({browser}) =>
     {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());

        //assert to verify attributes are present in the dom
        const DocumentLink =  page.locator("[href*='documents-request']");
        await expect(DocumentLink).toHaveAttribute("class","blinkingText");   

        const [childpage] = await Promise.all([
         context.waitForEvent('page'),
         DocumentLink.click(),
        ])

        const redline = await childpage.locator(".red").textContent();
        console.log(redline);
        const data = redline.split('@');
        const text = data[1].split(" ")[0];
        console.log(text);

        const username = page.locator('input#username');
        await username.fill(text);

        //difference between textcontent and input value
        console.log(await username.textContent()); // will not display value in the console because the value is eneterd by manual or coding and is not attached to the dom
        console.log(await username.inputValue()); // will be display value in the console because function capture the value enetered in the field.
        


    });

test("@object Parent child window with Facebook self ", async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://www.facebook.com/login.php");
        const Parent_page = await page.title();
        console.log("The parent page name is -----> "+Parent_page );

        await page.getByText('Create new account').click();
        await page.waitForLoadState('networkidle');
        const help_link = await page.getByRole('link', { name: 'Learn more' });
        
         const [childpage] = await Promise.all([
         context.waitForEvent('page'),
         help_link.click(),
        ])

         await childpage.waitForLoadState('networkidle');
        const childpage_title = await childpage.title();
        console.log("The child page name is -----> "+childpage_title );



    }
)


