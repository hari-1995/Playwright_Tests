import {test, assert, expect} from "@playwright/test";

test.only("Handling Iframes", async({page})=>
{
   await page.goto("https://jqueryui.com/tabs/");

    const iframe = page.frameLocator(".demo-frame");
    await iframe.getByText("Proin dolor").click();
    const data = await iframe.locator("div[id='tabs-2'] p").textContent();
    console.log(data);
   // expect (await page.screenshot()).toHaveScreenshot('Landing.png');
    
})

test("Handling Iframes with content frame", async({page})=>
{
    await page.goto("https://jqueryui.com/tabs/");
    const iframe = page.locator(".demo-frame");
    const iframelocator = iframe.contentFrame();
    await iframelocator.getByText("Proin dolor").click();
    const data = await iframelocator.locator("div[id='tabs-2'] p").textContent();
    console.log("The data is displayed after identifying the frame with content frame ---------->"+data);
    
})