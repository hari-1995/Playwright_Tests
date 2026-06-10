class Dashboardpage {

    constructor(page) {

        this.products =  page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");

    }
    async searchProduct(productName)
    {
         await this.productsText.first().waitFor();
        const all_titles = await this.productsText.allTextContents();
        console.log(all_titles);

        //number elements with the given locator
        const count = await this.products.count();
        for(let i=0; i< count; i++)
        {
            //if(await products.nth(i).textContent() == productname)
             if(await this.products.nth(i).locator("b").textContent() == productName)
                {
                console.log("The Desired product is ---> " + productName);
            
                //Add to Cart  Add To Cart
                 await this.products.nth(i).locator("text= Add To Cart").click();
                 break;
                }
        }
        
        
    }
    async navigateToCart()
        {
        //navigating to cart page
        await this.cart.click();
        }
        
}
module.exports = {Dashboardpage};
                