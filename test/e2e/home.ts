import { Key, by, element } from 'protractor';
import { HomePage } from './home.po';

describe('/', () => {

    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display the correct headline', () => {
        page.navigateTo();
        expect(page.getHeadline()).toEqual('Noiseless Web Audio tests');
    });

    it('should go to the next slide', () => {
        page.navigateTo();

        element(by.tagName('body')).sendKeys(Key.ARROW_RIGHT);

        expect(page.getSubHeadline()).toEqual('About me');
    });

});
