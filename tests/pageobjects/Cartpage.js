const {expect} = require('@playwright/test');

class Cartpage{
    constructor(page)
    {
        this.page = page;
        this.produtelement = page.locator("div li").first();
        this.checkoutbutton = page.getByRole("button",{name:"Checkout"});

    }

    async verifyproduct(productName)
        {
        await this.produtelement.waitFor();
        const bool = await this.getproductLocator(productName).isVisible();
        await expect(bool).toBeTruthy();
        }

    async clickcheckout()
        {
        await this.checkoutbutton.click();
        }

    getproductLocator(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {Cartpage};
