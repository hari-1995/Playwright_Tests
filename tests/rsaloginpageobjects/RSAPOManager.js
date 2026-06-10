const { LoginPage } = require('./LoginPage');

class RSAPOManager {
  constructor(page) {
    this.loginPage = new LoginPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }
}

module.exports = { RSAPOManager };

