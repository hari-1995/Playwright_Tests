import {test, expect} from '@playwright/test';

test("playwright special locators", async({browser}) =>
{
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //get by label
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");

    //get by place holder
    await page.getByPlaceholder("Password").fill("Test");

    //get by role
    await page.getByRole("button", {name:"Submit"}).click();

    //get by text
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name: "Shop"}).click();

    //filter
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
    await page.pause();

}); 