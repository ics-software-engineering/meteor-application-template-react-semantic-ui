import { Selector } from 'testcafe';

const topMenuSelector = Selector('.top.attached.menu');
const topMenuLeftItemSelector = topMenuSelector.child('.item').nth(0).child('h1');
const loginSelector = topMenuSelector.child('.right.item').child('.dropdown');
const signInSelector = loginSelector.child('.menu.transition.visible').child('a').nth(0);
const topMenuItemsSelector = topMenuSelector.child('.item');

/* global fixture, test */
fixture('Landing Page')
    .page('http://localhost:3000');

test('MenuBar', async (browser) => {
  await browser.expect(topMenuSelector.child().count).eql(2);
  await browser.expect(topMenuLeftItemSelector.textContent).eql('meteor-application-template');
});

test('User Login', async (browser) => {
  await browser.click(loginSelector);
  await browser.click(signInSelector);
  await browser.typeText(Selector('input[name=email]'), 'john@foo.com');
  await browser.typeText(Selector('input[name=password]'), 'changeme');
  await browser.click(Selector('div.field button.ui.button'));
  await browser.expect(topMenuItemsSelector.count).eql(4);
  // await browser.wait(2000);
});
