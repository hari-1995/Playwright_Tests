/************************* 
const { Before, After, AfterStep, status, setDefaultTimeout } = require("@cucumber/cucumber");
const path = require("node:path");
const { after } = require("node:test");

setDefaultTimeout(20 * 1000);   

Before(async function () {
    console.log("This is the Before hook which will execute before each scenario");
});

After(async function () {       
    console.log("This is the After hook which will execute after each scenario");
    
    await this.page.close();
});     

AfterStep(async function () {
    console.log("This is the AfterStep hook which will execute after each step");
    if (status === "failed") {
        const screenshotPath = path.join(__dirname, "..", "Screenshots", `screenshot_${Date.now()}.png`);
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot captured at: ${screenshotPath}`);
    }
});
*********************/