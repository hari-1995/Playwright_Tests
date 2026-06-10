const {test,expect} = require('@playwright/test');

test("Facebooktest",async({browser})=>
{
    const pagetitle = "EventHub — Discover & Book Events";
    const username = "rr.shekarkumar123@gmail.com";
    const password = "Shekar@1995";
    const event_name = "Dilli Diwali Mela";
    let event_tickets = 4;
    const fullname = "Shekar Kumar";
    const phone_number = "8686134688";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    //Login Functionality

    await page.getByPlaceholder("you@email.com").fill(username);
    await page.getByRole("textbox",{name: "password"}).fill(password);
    await page.getByRole("button",{name: "Sign In"}).click();
    await page.getByText(event_name).click();
    await page.waitForLoadState('networkidle');
    console.log("Title of the page is  --->" + await page.title());
    expect(await page.title()).toBe(pagetitle);

    //event registration
    const plusbutton = await page.getByRole("button",{name: "+"});
    await plusbutton.waitFor();

    for(let i=1;i<event_tickets; i++)
    {
        await plusbutton.click();
    }

    await page.getByLabel("Full Name").fill(fullname);
    await page.getByText("Email").fill(username);
    await page.locator("#phone").fill(phone_number);
    await page.getByRole("button", {name:"Confirm Booking"}).click();

    //conformation page
    const confirmationmessgae = page.getByText('Booking Confirmed! 🎉');
    await confirmationmessgae.waitFor();
    await expect(confirmationmessgae).toBeVisible();

    const bookingid = await page.locator(".booking-ref").textContent();
    console.log("The booking id is --->" + bookingid); 
    
    //booking page
    await page.locator("#nav-bookings").click();
    await expect(page).toHaveURL(/.*bookings/);
    const booking_card = await page.locator("#booking-card").nth(0);
    await booking_card.waitFor();
    await booking_card.getByRole("button",{name:"View Details"}).click();
    await page.locator("#check-refund-btn").click();
    await page.waitForTimeout(6000);
    const result = await page.locator("#refund-result");
    await expect(result).toBeVisible();
    const refund_status = await result.textContent();
    console.log("The refund status is --->" + refund_status);


    //const bookingid_text = await page.locator(".booking-id").nth(0).textContent();

    await page.pause();


})  