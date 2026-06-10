const {test,expect} = require('@playwright/test');
const {FBPOManager} = require('./Facebookpageobjects/FBPOManager.js');
const Dataset = JSON.parse(JSON.stringify(require('../utils/FBTeseData.json')));

for (const data of Dataset)
{
test(`Event Booking for ---> ${data.Event}`,async({browser})=>
{
    const pagetitle = "EventHub — Discover & Book Events";
    const username = "rr.shekarkumar123@gmail.com";
    const password = "Shekar@1995";
    const event_name = data.Event;
    const event_tickets = data.Tickets;
    const fullname = "Kiran Kumar Reddy";
    const phone_number = data.Phone;
    const context = await browser.newContext();
    const page = await context.newPage();
    const FBpom = new FBPOManager(page,event_name);
    
    //Login Functionality
    const Loginpage = FBpom.getLoginpage();
    await Loginpage.goto(page);
    await Loginpage.EventLogin(username,password,pagetitle);

    //event registration
    const EventRegpage = FBpom.getEventregpage(page,event_name);
    await EventRegpage.Eventcreation(event_name,event_tickets,fullname,username,phone_number);

    //conformation page
    const Confirmationpage = FBpom.getConfirmationpage(page);
    const bookingNumber = await Confirmationpage.confirrmationscreenvalidation(event_name); 
    console.log("The booking number is --->" + bookingNumber);

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

    //clearing the events from booking page
   /**************************** 
    await page.locator("#nav-bookings").click();


    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Clear all bookings' }).click();
  await page.waitForTimeout(2000);
    await page.screenshot({path: `./screenshots/MY_Bookings.png`, fullPage: true});
********************************/


})  
}