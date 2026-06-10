import {test, expect } from "@playwright/test";

test(" [@object] Mouse Hover", async({page})=>
{
    await page.goto("https://www.flipkart.com/");
    await page.locator('span:has-text("Login")').hover();
    await page.waitForTimeout(4000);

})

test(" [@object] Drag and Drop", async({page})=>
{
    await page.goto("https://jqueryui.com/droppable/");
    const iframe = page.frameLocator(".demo-frame");
    const drag = iframe.locator("#draggable");
    const drop = iframe.locator("#droppable");
    await drag.dragTo(drop);
})

test(" [@ui] double click", async({page})=>
{
    await page.goto("https://textbox.johnjago.com/");
    await page.locator("//textarea").pressSequentially("Hari Krishna Yenishetla", {delay: 1000});
    await page.locator("//textarea").dblclick();
    await page.locator("//textarea").dblclick({button:"right"});
})

test(' [@smoke] Keyboard Operations', async({page})=>
{ 
   await page.goto("https://textbox.johnjago.com/");
   await page.locator("//textarea").pressSequentially("Hari Krishna Yenishetla", {delay: 200});
   await page.locator("//textarea").press("Control+a");
   await page.locator("//textarea").press("Backspace");
    await page.keyboard.type("Hari Krishna Yenishetla", {delay: 200});


})