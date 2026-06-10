class EventRegPage {

    constructor(page,event_name) {
        this.page = page;
        this.Event_name = page.getByText(event_name);
        this.plusbutton = page.getByRole("button", { name: "+" });
        this.fullname = page.getByLabel("Full Name");
        this.email = page.getByText("Email");
        this.phonenumber = page.locator("#phone");
        this.confirmationbutton = page.getByRole("button", {name:"Confirm Booking"});
    }

    async Eventcreation(event_name,event_tickets,fullname,username,phone_number )
    {
    await this.Event_name.click();
    await this.plusbutton.waitFor();

    for(let i=0;i<event_tickets-1; i++)
    {
        await this.plusbutton.click();
    }

    await this.page.getByLabel("Full Name").fill(fullname);
    await this.page.getByText("Email").fill(username);
    await this.page.locator("#phone").fill(phone_number);
    await this.page.getByRole("button", {name:"Confirm Booking"}).click();
    }

}
module.exports = {EventRegPage};  