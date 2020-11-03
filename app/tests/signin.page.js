import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SigninPage {
  constructor() {
    this.pageId = '#signin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signin-form-email', username);
    await testController.typeText('#signin-form-password', password);
    await testController.click('#signin-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();
