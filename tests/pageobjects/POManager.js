const {Loginpage} = require('./Loginpage.js');
const {Dashboardpage} = require('./Dashboardpage.js');
const {Cartpage} = require('./Cartpage.js');

class POManager {
    constructor(page) {

        this.loginpage = new Loginpage(page);
        this.dashboardpage = new Dashboardpage(page);
        this.cartpage = new Cartpage(page);
    }

    getLoginpage(){
        return this.loginpage;
    }

    getDashboardpage(){
        return this.dashboardpage;
    }

    getCartpage(){
        return this.cartpage;
    }


}
module.exports = POManager;
