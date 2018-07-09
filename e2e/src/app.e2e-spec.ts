import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app-notes module', () => {
    page.navigateTo();
    expect(page.getNotesElement()).toBeTruthy();
  });

  it('should show addOrEdit form after clicking addOrEdit button', function () {
    page.navigateTo();
    page.clickAddButton();
    expect(page.isCreation).toBeTruthy();
  });
});
