import { DemineurPage } from './app.po';

describe('demineur App', function() {
  let page: DemineurPage;

  beforeEach(() => {
    page = new DemineurPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
