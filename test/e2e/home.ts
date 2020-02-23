import { Key, browser, by, element, logging } from 'protractor';
import { HomePage } from './home.po';

describe('/', () => {

    let page: HomePage;

    afterEach(async () => {
        try {
            // Assert that there are no errors emitted from the browser
            const logs = await browser.manage().logs().get(logging.Type.BROWSER);

            expect(logs).not.toContain(jasmine.objectContaining(<Partial<logging.Entry>> {
                level: logging.Level.SEVERE
            }));
        } catch (err) {
            // @todo The driver for Safari does not support to retrieve the logs.
            if (err.name === 'UnsupportedOperationError') {
                console.warn('The driver for Safari does not support to retrieve the logs.'); // tslint:disable-line:no-console
            } else {
                throw err;
            }
        }
    });

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

        /*
         * @todo Unfortunately an arbitrary call browser.sleep() is used here as both element(by.tagName('body')).allowAnimations(false)
         * and browser.waitForAngular() have no effect.
         */
        browser.sleep(1000);

        expect(page.getSubHeadline()).toEqual('About me');
    });

});
