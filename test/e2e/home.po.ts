import { browser, by, element, promise } from 'protractor';

export class HomePage {
    // eslint-disable-next-line class-methods-use-this
    public getHeadline(): promise.Promise<string> {
        return element(by.css('wac-app h1')).getText();
    }

    // eslint-disable-next-line class-methods-use-this
    public getSubHeadline(): promise.Promise<string> {
        return element(by.css('wac-app h2:first-child')).getText();
    }

    // eslint-disable-next-line class-methods-use-this
    public navigateTo(): promise.Promise<unknown> {
        return browser.get(browser.baseUrl);
    }
}
