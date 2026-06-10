const {test, assert, expect} = require("@playwright/test");

test("Popup Validations", async({page})=>
{
    //farward, backward navigations on the browser
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();

    //to verify visible or hidden assert validations
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.pause();
    //to handel alert popups - in playwright popups are called as dialogs
    page.on('dialogmessage', dialog => console.log(dialog.message()));
    page.on('dialog', dialog=>dialog.accept()); //to accept alert
// page.on('dialog', dialog=>dialog.dismiss()); //to close alert
    await page.locator("#confirmbtn").click();
 
    //hover on the elements
    await page.locator("#mousehover").hover();

    //Handling frames.
    //const framespage = page.frameLocator("#courses-iframe");

})

test("Child Window Validations", async({page})=>
{
    const pagetitle = "EventHub — Discover & Book Events";
    const username = "rr.shekarkumar123@gmail.com";
    const password = "Shekar@1995";
    const event_name = "Dilli Diwali Mela";

await page.goto("https://eventhub.rahulshettyacademy.com/login");

    //Login Functionality

    await page.getByPlaceholder("you@email.com").fill(username);
    await page.getByRole("textbox",{name: "password"}).fill(password);
    await page.getByRole("button",{name: "Sign In"}).click();
    await page.getByText(event_name).click();
    await page.waitForLoadState('networkidle');
    console.log("Title of the page is  --->" + await page.title());
    await page.locator("#nav-bookings").click();

    //await page.locator("button:has-text('View My Bookings')").click();

    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Clear all bookings' }).click();
    await page.screenshot({path: `./screenshots/MY_Bookings.png`, fullPage: true});

})