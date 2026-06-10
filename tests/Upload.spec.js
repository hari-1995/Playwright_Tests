const Exceljs = require("exceljs");
const {test, expect} = require('@playwright/test');
const { text } = require("node:stream/consumers");

async function Writeexceltest(searchtext,replacetext,change,filepath)
{

const workbook = new Exceljs.Workbook();
await workbook.xlsx.readFile(filepath)

const worksheet = workbook.getWorksheet("Sheet1");
const output = await Readexcel(worksheet, searchtext);

const cell = worksheet.getCell(output.row+change.rowchange,output.column+change.colchange);
console.log("Cell Value before update is -->"+ cell.value );
cell.value = replacetext;
await workbook.xlsx.writeFile(filepath);
}

async function Readexcel(worksheet, searchtext)
{
let output = {row:-1, column:-1};
worksheet.eachRow((row,rownumber) =>
{
    row.eachCell((cell,colnumber)=>
    {
        if(cell.value===searchtext)
        {
            output.row = rownumber;
            output.column=colnumber;
            console.log("Row Number is -->"+output.row);
            console.log("Column Number is -->"+output.column);
        }
    })
})
return output;
}


//Writeexceltest("Apple","redish",{rowchange:0, colchange:1},"Excel.xlsx");

test("Upload download excel validations", async({browser})=>
{
    const textsearch = "Mango";
    const updateValue= "350"
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    //await page.getByRole("button",{name:"Download"}).click();
    await page.locator("#downloadButton").click();
    await downloadPromise;
   Writeexceltest(textsearch,updateValue,{rowchange:0, colchange:2},"C:\\Users\\Haritha\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Haritha\\Downloads\\download.xlsx");
    
    const textLocator = page.getByText(textsearch);
    const desiredRow =await page.getByRole("row").filter({has:textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);



})



