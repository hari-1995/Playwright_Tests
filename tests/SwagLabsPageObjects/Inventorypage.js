class InventoryPage {

    constructor(page){
        this.page = page;
        this.products_List = this.page.locator('.inventory_item_name');
    }

    async getProductsList(){
        const products_list = await this.products_List.allTextContents();
        console.log('List of products:');
        for (const product of products_list) {
            console.log('- ' + product);
        }
    }

    async selectProduct(productName) {
        const products = this.products_List;
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            const text = (await products.nth(i).innerText()).trim();
            if (text === productName) {
                await products.nth(i).click();
                console.log(`Clicked on the product: ${productName}`);
                await this.page.waitForLoadState('networkidle');
                return;
            }
        }
        throw new Error(`Product not found: ${productName}`);
    }
}

module.exports = { InventoryPage };