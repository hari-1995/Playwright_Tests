const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = this.page.locator('.shopping_cart_link');
        this.checkoutButton = this.page.locator('#checkout');
            }   
        async clickCartIcon() {
            await this.cartIcon.click();
            await this.page.waitForLoadState('networkidle');
        }   

        async VerifyCartPage() {
            await this.page.waitForLoadState('networkidle');
            await expect(this.page.url()).toContain('/cart.html');
        }   

        async clickCheckoutButton() {
            await this.checkoutButton.click();
            await this.page.waitForLoadState('networkidle');
        }
            
}

module.exports = { CartPage };