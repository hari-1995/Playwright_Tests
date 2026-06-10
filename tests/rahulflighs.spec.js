import { test, expect } from "@playwright/test";

const URL = "https://rahulshettyacademy.com/dropdownsPractise/#";

const S = {
  roundTrip: "#ctl00_mainContent_rbtnl_Trip_1",

  fromInput: "#ctl00_mainContent_ddl_originStation1_CTXT",
  toInput: "#ctl00_mainContent_ddl_destinationStation1_CTXT",
  fromContainer: "#ctl00_mainContent_ddl_originStation1_CTNR",
  toContainer: "#ctl00_mainContent_ddl_destinationStation1_CTNR",

  departDate: "#ctl00_mainContent_view_date1",
  returnDate: "#ctl00_mainContent_view_date2",

  adult: "#ctl00_mainContent_ddl_Adult",
  child: "#ctl00_mainContent_ddl_Child",
  infant: "#ctl00_mainContent_ddl_Infant",

  currency: "#ctl00_mainContent_DropDownListCurrency",
  familyFriends: "#ctl00_mainContent_chk_friendsandfamily",
};

async function setHiddenSelectValue(page, selector, value) {
  await page.locator(selector).evaluate(
    (el, v) => {
      el.value = v;
      el.dispatchEvent(new Event("change", { bubbles: true }));
    },
    value
  );
}

async function makeInputEditable(page, selector) {
  await page.locator(selector).evaluate((el) => el.removeAttribute("readonly"));
}

async function pickStationFromDropdown(page, inputSelector, containerSelector, value, text) {
  const input = page.locator(inputSelector);
  await expect(input).toBeVisible({ timeout: 20_000 });
  await input.click();

  const option = page
    .locator(containerSelector)
    .locator(`a[value='${value}'], a:has-text("${text}")`)
    .first();
  await expect(option).toBeVisible({ timeout: 20_000 });
  await option.click();

  return input;
}

test("RahulShetty dropdowns - round trip booking inputs", async ({ page }) => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  // Radio button: Round Trip
  await page.locator(S.roundTrip).check();
  await expect(page.locator(S.roundTrip)).toBeChecked();

  // From: Hyderabad (HYD), To: Bengaluru (BLR)
  const from = await pickStationFromDropdown(
    page,
    S.fromInput,
    S.fromContainer,
    "HYD",
    "Hyderabad (HYD)"
  );
  const to = await pickStationFromDropdown(
    page,
    S.toInput,
    S.toContainer,
    "BLR",
    "Bengaluru (BLR)"
  );

  // Depature Date: 25-Apr-2026, Return Date: 30-Apr-2026
  await makeInputEditable(page, S.departDate);
  await makeInputEditable(page, S.returnDate);
  await page.locator(S.departDate).fill("25-04-2026"); // dd-mm-yyyy
  await page.locator(S.returnDate).fill("30-04-2026"); // dd-mm-yyyy

  // Passengers -> Adult - 2 ->Infant - 1 ->Children - 1
  await setHiddenSelectValue(page, S.adult, "2");
  await setHiddenSelectValue(page, S.child, "1");
  await setHiddenSelectValue(page, S.infant, "1");

  // Currency - USD
  await setHiddenSelectValue(page, S.currency, "USD");
  await expect(page.locator(S.currency)).toHaveValue("USD");

  // Select Family and Friends -> popup -> OK
  const family = page.locator(S.familyFriends);

  const dialogPromise = page.waitForEvent("dialog", { timeout: 2000 }).catch(() => null);
  await family.click({ force: true });
  const dialog = await dialogPromise;
  if (dialog) {
    await expect(dialog.message()).toMatch(/family and friends/i);
    await dialog.accept();
  }

  // Sanity: ensure the selected stations are applied.
  await expect(from).toHaveValue(/HYD/i);
  await expect(to).toHaveValue(/BLR/i);
});

