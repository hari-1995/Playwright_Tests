const { test, expect } = require("@playwright/test");

test("Client app - E2E order placement (ADIDAS ORIGINAL)", async ({ page }) => {
  const baseUrl = "https://rahulshettyacademy.com/client/#/auth/login";
  const email = "rr.shekarkumar123@gmail.com";
  const password = "Shekar@1995";
  const productName = "ADIDAS ORIGINAL";

  // 1) Login and verify dashboard
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/#\/dashboard\/dash/i);
  await expect(page.locator(".card-body b").first()).toBeVisible();

  // 2) Wait for products, add ADIDAS ORIGINAL to cart
  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: /add to cart/i })
    .click();

  // 3) Go to cart and verify navigation + product present
  await page.locator("[routerlink*='cart']").click();
  await expect(page).toHaveURL(/#\/dashboard\/cart/i);
  await page.locator("div li").first().waitFor();
  await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();

  // 4) Checkout -> verify payment method screen
  await page.getByRole("button", { name: /checkout/i }).click();
  await expect(page).toHaveURL(/#\/dashboard\/order/i);
  await expect(page.getByPlaceholder("Select Country")).toBeVisible();

  // 5) Verify email under Shipping Information
  await expect(page.locator(".user__name label")).toHaveText(email);

  // 6) Country dropdown: type "Ind" and select INDIA
  await page.getByPlaceholder("Select Country").pressSequentially("Ind");
  const dropdown = page.locator(".ta-results");
  await expect(dropdown).toBeVisible();
  await dropdown.getByRole("button", { name: /^india$/i }).first().click();

  // 7) Place order -> verify confirmation page
  await page.getByText("PLACE ORDER").click();
  await expect(page).toHaveURL(/#\/dashboard\/thanks/i);

  // 8) Verify thank you message, capture and print order id
  await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
  const orderIdRaw = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  const orderId = (orderIdRaw || "").trim();
  console.log(`Order id: ${orderId}`);
});

