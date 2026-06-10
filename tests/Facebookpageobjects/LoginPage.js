const {expect} = require('@playwright/test');


class LoginPage{
    constructor(page){
        this.page = page;
        this.pagetitle = "EventHub — Discover & Book Events";
        this.username = page.getByPlaceholder("you@email.com");
        this.password = page.getByRole("textbox",{name: "password"});
        this.signinbutton = page.getByRole("button",{name: "Sign In"});

    }

    async goto(page)
    {
         await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
    }

    async EventLogin(username,password,pagetitle)
    {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signinbutton.click();
    console.log("The application is launched successfully");
    await this.page.waitForLoadState('networkidle');
    console.log("Title of the page is  --->" + await this.page.title());
    expect(await this.page.title()).toBe(this.pagetitle);
    
    }
}

module.exports = {LoginPage};
