const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginUrl = 'https://rahulshettyacademy.com/loginpagePractise/';
    this.shopUrlRegex = /\/angularpractice\/shop\/?$/;

    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.signInBtn = page.locator('#signInBtn');
    this.alert = page.locator('.alert-danger');

    this.adminRadio = page.locator('input[type="radio"][name="radio"][value="admin"]');
    this.userRadio = page.locator('input[type="radio"][name="radio"][value="user"]');
    this.modal = page.locator('#myModal');
    this.cancelBtn = page.locator('#cancelBtn');
    this.okayBtn = page.locator('#okayBtn');

    this.professionDropdown = page.locator('select.form-control');
    this.shopHeading = page.getByRole('heading', { name: 'Shop Name' });
  }

  async goto() {
    await this.page.goto(this.loginUrl);
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async verifyRedirectedToShop() {
    await this.page.waitForURL(this.shopUrlRegex, { timeout: 15_000 });
    await expect(this.page).toHaveURL(this.shopUrlRegex);
    await expect(this.shopHeading).toBeVisible();
  }

  async verifyEmptyCredentialsError() {
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toContainText('Empty');
    await expect(this.alert).toContainText('username/password');
  }

  async verifyIncorrectCredentialsError() {
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toContainText('Incorrect');
    await expect(this.alert).toContainText('username/password');
  }

  async verifyOldPasswordMigrationMessage() {
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toContainText('Old password "learning" is no longer valid');
    await expect(this.alert).toContainText('Learning@830$3mK2');
  }

  async selectUserRoleExpectModal() {
    await expect(this.adminRadio).toBeChecked();
    await this.userRadio.check({ force: true });
    await expect(this.modal).toBeVisible();
  }

  async modalCancelExpectAdmin() {
    await this.cancelBtn.click();
    await expect(this.adminRadio).toBeChecked();
  }

  async modalOkayExpectUser() {
    await this.okayBtn.click();
    await expect(this.userRadio).toBeChecked();
  }

  async verifyProfessionOptions() {
    await expect(this.professionDropdown).toBeVisible();
    await expect(this.professionDropdown.locator('option')).toHaveText([
      'Student',
      'Teacher',
      'Consultant',
    ]);
  }

  async selectProfessionByValue(value) {
    await this.professionDropdown.selectOption({ value });
    await expect(this.professionDropdown).toHaveValue(value);
  }
}

module.exports = { LoginPage };

