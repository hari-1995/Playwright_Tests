const { expect } = require('@playwright/test');

class SwagLoginPage{
    constructor(page){
        this.page = page;
        this.username = this.page.getByPlaceholder("Username");
        this.password = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button",{name: "Login"});
        this.sort = this.page.locator(".product_sort_container");
    }       
    
    async goto(){
               await this.page.goto("https://www.saucedemo.com/");
               await this.page.waitForLoadState('networkidle');
    }

    async EnterloginDetails(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async titleverification(){
        await this.page.waitForLoadState('networkidle');
        console.log('Title of the page is  --->' + await this.page.title());
        expect(await this.page.title()).toBe('Swag Labs');
        await expect(this.page.url()).toContain('/inventory.html');
        await this.sort.selectOption('lohi');
    }
}
module.exports = {SwagLoginPage};
