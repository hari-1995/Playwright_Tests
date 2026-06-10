const { test } = require('@playwright/test');
const { RSAPOManager } = require('./rsaloginpageobjects/RSAPOManager');

test.describe('Rahul Shetty Academy - LoginPage Practise', () => {
  test('valid login redirects to Shop', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
    await loginPage.verifyRedirectedToShop();
  });

  test('empty username/password shows error', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.clickSignIn();
    await loginPage.verifyEmptyCredentialsError();
  });

  test('invalid username/password shows error', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.login('wrong-user', 'wrong-pass');
    await loginPage.verifyIncorrectCredentialsError();
  });

  test('old password "learning" shows migration message', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.login('rahulshettyacademy', 'learning');
    await loginPage.verifyOldPasswordMigrationMessage();
  });

  test('selecting User role prompts modal; Cancel reverts to Admin', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.selectUserRoleExpectModal();
    await loginPage.modalCancelExpectAdmin();
  });

  test('selecting User role prompts modal; Okay keeps User selected', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.selectUserRoleExpectModal();
    await loginPage.modalOkayExpectUser();
  });

  test('profession dropdown contains expected options', async ({ page }) => {
    const rsaPom = new RSAPOManager(page);
    const loginPage = rsaPom.getLoginPage();

    await loginPage.goto();
    await loginPage.verifyProfessionOptions();
    await loginPage.selectProfessionByValue('teach');
  });
});

