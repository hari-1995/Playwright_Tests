const{test, expect}  = require('@playwright/test');



test.only('Brower Context Playwright Test', async ({browser}) =>
     {
        const context = await browser.newContext();
        const page = await context.newPage();
        // aborting the css and images to improve the performance of the test execution
        page.route('**/*.css', route => route.abort());
        page.route('**/*.{png,jpg,jpeg}', route => route.abort());
        
        // logging all the network requests and responses in the console
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));
        
        const username = page.locator('input#username');
        const signin_button = page.locator('#signInBtn');
        const card_titles = page.locator('.card-body a');

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        await username.fill("Rahulshetty");
        await page.locator("[type='password']").fill("Learning@830$3mK2");
        await page.locator('#signInBtn').click();

       console.log(await page.locator("[style*='block']").textContent());
        const nameerror = await page.locator("[style*='block']").textContent();
        expect(nameerror).toContain('Incorrect');

        await username.fill("");
        await username.fill("rahulshettyacademy");
        await signin_button.click();

       // console.log(await card_titles.nth(1).textContent());
       // console.log(await card_titles.first().textContent());
        //await page.waitForLoadState("networkidle");
        await card_titles.first().waitFor();
        const alltitles = await card_titles.allTextContents();
        console.log(alltitles);

    });

    test('UI Controls Playwright Test', async ({browser}) =>
     {
        const context = await browser.newContext();
        const page = await context.newPage();
        const username = page.locator('input#username');
        const signin_button = page.locator('#signInBtn');

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());

        await username.fill("rahulshettyacademy");
        await page.locator("[type='password']").fill("Learning@830$3mK2");

        //handling static dropdown
        const dropdown = page.locator("select.form-control");
        await dropdown.selectOption("Consultant");

        //handling radio button
        await page.locator(".customradio").last().click();
        await page.locator("#okayBtn").click();
        console.log("verifying radio button is checked or not")
        console.log(await page.locator(".customradio").last().isChecked());

        //assert option for the radio button.
        await expect(page.locator(".customradio").last()).toBeChecked();

        //handling check box - checking
        await page.locator("#terms").click();
        console.log("verifying check box is checked or not")
        console.log(await page.locator("#terms").isChecked());

        //assert option for the radio
        await expect(page.locator("#terms")).toBeChecked();

        //handling check box - unchecking
         await page.locator("#terms").uncheck();
        console.log("verifying check box is checked or not")
        console.log(await page.locator("#terms").isChecked());

        //assert to verify attributes are present in the dom
        const DocumentLink = page.locator("[href*='documents-request']");
        await expect(DocumentLink).toHaveAttribute("class","blinkingText");        
    });

    

    test('Page Context Playwright Test', async ({page}) =>
     {
        await page.goto("https://google.com");
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });