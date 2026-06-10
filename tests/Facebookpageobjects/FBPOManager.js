const {LoginPage} = require('./LoginPage');
const {EventRegPage} = require('./EventRegPage');
const {ConfirmationPage} = require('./ConfirmationPage');

class FBPOManager{
    constructor(page,event_name)
    {
        this.loginpage = new LoginPage(page);
        this.eventregpage = new EventRegPage(page,event_name);    
        this.confirmationpage = new ConfirmationPage(page);
    }    
    getLoginpage(){
        return this.loginpage;
    }
    getEventregpage(){
        return this.eventregpage;
    }   
    getConfirmationpage(){
        return this.confirmationpage;
    }
}
module.exports = {FBPOManager};