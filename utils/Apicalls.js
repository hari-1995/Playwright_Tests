class Apicalls {
    constructor(apiContext, loginpayload)
    {
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;
        
    }

    async gettoken()
    {
        const login_Response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                    {
                       data: this.loginpayload
                    }
                 )
              const login_ResponseJson = await login_Response.json();
              let token = login_ResponseJson.token;
                 return token;
    }

    async getorderid(orderpayload)
    {
        let response = {};
        response.token = await this.gettoken();
        const oderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
         {
            data: orderpayload,
            headers : {
                        'Authorization': response.token,
                        'Content-Type' : 'application/json',
                      }, 
         }
        )
        const oderResponseJson = await oderResponse.json();
        let orderid = oderResponseJson.orders[0];
        console.log("The order id is ----->" + orderid);          
        response.orderid = orderid;
        return response;
    }

    

}
module.exports = {Apicalls};