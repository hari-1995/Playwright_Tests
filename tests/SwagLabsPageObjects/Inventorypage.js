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
        const products_list = await this.products_List.allTextContents();
    for (const product of products_list) {
        if (product === productName) {
            await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
            console.log(`Clicked on the product: ${productName}`);
            break;
        }
    }   
    }
}

module.exports = { InventoryPage };