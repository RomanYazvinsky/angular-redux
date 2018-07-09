import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle() {
    return browser.getTitle();
  }

  getNotesElement() {
    return element(by.tagName('app-notes'));
  }

  clickAddButton() {
    element(by.buttonText('New')).click();
  }

  isCreation() {
    return element(by.tagName('app-note'));
  }
}
