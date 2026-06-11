const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstnameInput = this.page.locator('#first-name');
        this.lastnameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
    }

    async VerifyCheckoutPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/checkout-step-one.html');
    }   
}
module.exports = { CheckoutPage };