import { SplitBillsClientNewPage } from './app.po';

describe('split-bills-client-new App', () => {
  let page: SplitBillsClientNewPage;

  beforeEach(() => {
    page = new SplitBillsClientNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
