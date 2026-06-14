const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstnameInput = this.page.locator('#first-name');
        this.lastnameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
        this.finishButton = this.page.locator('#finish');
    }

    async VerifyCheckoutPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/checkout-step-one.html');
    } 
    
    async EnterCheckoutDetails(firstname, lastname, postalcode) {
        await this.firstnameInput.fill(firstname);
        await this.lastnameInput.fill(lastname);
        await this.postalCodeInput.fill(postalcode);
    }

    async ClickContinueButton() {
        await this.continueButton.click();
    }

    async VerifyCheckoutOverviewPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/checkout-step-two.html');
    }

    async ClickFinishButton() {
        await this.finishButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async VerifyCheckoutCompletePage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/checkout-complete.html');
    }

    async VerifyFinshPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/checkout-complete.html');
        await expect(this.page.locator('.complete-header')).toBeVisible();
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
        await expect(this.page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }
}
module.exports = { CheckoutPage };