const {test, expect}= require("@playwright/test");

test("Calender function", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const month ="5";
    const date = "9";
    const year = "2027";
    const expectedList = [month, date, year];

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(month)-1).click();
    await page.locator("//abbr[text()=9]").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input");

    for(let i=0; i<expectedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        console.log("The Actual Value is ---->"+value);
        expect(value).toEqual(expectedList[i]);
    }




}

)