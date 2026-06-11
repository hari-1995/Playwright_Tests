const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    }  
    
    async verifyProductDetailsPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.url()).toContain('/inventory-item.html');
    }

    async clickAddToCart() {
        await this.page.waitForLoadState('networkidle');
        await this.addToCartButton.click();
    }

    async verifyProductAddedToCart() {
        const cartBadge = this.page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeVisible();
        const itemCount = await cartBadge.textContent();
        expect(itemCount).toBe('1');
        await this.page.screenshot({ path: 'C:\\Users\\Haritha\\Documents\\Playwright\\screenshots\\product_added_to_cart.png' });
    }
}   
module.exports = { ProductsPage };

