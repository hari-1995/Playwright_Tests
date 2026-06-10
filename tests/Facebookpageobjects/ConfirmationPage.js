const {expect} = require('@playwright/test');

class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmationmessgae = page.getByText('Booking Confirmed! 🎉');
        this.bookingid =page.locator(".booking-ref");
    }

   async confirrmationscreenvalidation(event_name){

            await this.confirmationmessgae.waitFor();
            await expect(this.confirmationmessgae).toBeVisible();
        
            const booking_number = await this.bookingid.textContent();
            //console.log("The booking id is --->" + booking_number);
            await this.page.screenshot({path: `./screenshots/${event_name}_Confirmation.png`, fullPage: true});
            return booking_number;
        }

    }   
    module.exports = {ConfirmationPage};