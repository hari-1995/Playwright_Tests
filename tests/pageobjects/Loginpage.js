class Loginpage{

    constructor(page){
        this.page=page;
        this.signinbutton = page.getByRole("button", {name: "Login"});
        this.username = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async vlaidlogin(userName,passWord){
         await this.username.fill(userName); 
        await this.password.fill(passWord);
        await this.signinbutton.click();
        await this.page.waitForLoadState('networkidle');

    }
}

module.exports = {Loginpage};
